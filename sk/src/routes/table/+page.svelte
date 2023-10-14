<script lang="ts">
  import { resolveMovie } from '$lib/api';
  import IntentStatus from '$lib/components/IntentStatus.svelte';
  import MovieBox from '$lib/components/MovieBox.svelte';
  import MovieFiltering from '$lib/components/MovieFiltering.svelte';
  import MovieGrid from '$lib/components/MovieGrid.svelte';
  import UserMediaGrid from '$lib/components/UserMediaGrid.svelte';
  import { authModel, pb, watch } from '$lib/pocketbase';
  import type {
    MediaResponse,
    SuggestionResponse,
    UserMediaResponse,
    UsersResponse,
  } from '$lib/pocketbase/pocketbase-types';
  import { throttle } from '$lib/util';
  import type { MovieResultsResponse } from '../../../hooks/movieDbTypes';

  const suggestions = watch<SuggestionResponse<{ media: MediaResponse }>>(
    'suggestion',
    {
      expand: 'media,user',
      filter: 'active = true',
    },
    {
      updateFilter(record) {
        return record.active === true;
      },
    }
  );

  async function addToTable(id: number) {
    const media = await resolveMovie(id);
    await pb.collection('suggestion').create({
      media,
      user: $authModel?.id,
      active: true,
    });
  }

  async function removeFromTable(id: string) {
    await pb.collection('suggestion').update(id, {
      active: false,
    });
  }

  const tabs = [
    {
      label: 'All',
      value: 'all',
      icon: 'i-ph-squares-four',
      selectedClass: 'btn-primary',
    },
    { label: 'Want', value: 'want', icon: 'i-ph-thumbs-up', selectedClass: 'btn-success' },
  ] as const;
  let tab: (typeof tabs)[number]['value'] = 'want';

  let query = '';
  let results: MovieResultsResponse | null = null;

  const watchQuery = throttle(async (value: string) => {
    if (value) {
      const data = await pb.send('/api/search', { params: { q: value } });
      results = data;
    } else {
      results = null;
    }
  }, 200);

  $: watchQuery(query);

  // User Media

  const userMediaLibrary = watch<UserMediaResponse<{ user: UsersResponse }>>(
    'user_media',
    { expand: 'user', filter: 'media = null', $cancelKey: 'userMediaIntentions' },
    {
      updateFilter(record) {
        return record.intent !== null;
      },
    }
  );

  $: userMedias = $userMediaLibrary.items.reduce(
    (acc, userMedia) =>
      acc[userMedia.media]
        ? { ...acc, [userMedia.media]: [...acc[userMedia.media], userMedia] }
        : { ...acc, [userMedia.media]: [userMedia] },
    {} as Record<string, UserMediaResponse<{ user: UsersResponse }>[]>
  );

  function setUserMediaFilter(suggestionList: SuggestionResponse<{ media: MediaResponse }>[]) {
    userMediaLibrary.setFilter(
      `intent != null && (${[...new Set(suggestionList.map((s) => s.media))]
        .map((id) => `media="${id}"`)
        .join(' || ')})`
    );
  }
  $: setUserMediaFilter($suggestions.items);
</script>

<div
  class="inline-block text-center gap-3 py-2 px-2 bg-base-subtle overflow-x-auto whitespace-nowrap"
>
  <h3 class="font-bold text-xl mb-2">Suggestions</h3>
  {#each $suggestions.items as movie (movie.id)}
    <div class="flex-inline flex-col gap-1 mx-3 text-left whitespace-normal">
      <div class="flex">
        <button
          class="ml-auto btn btn-danger min-h-auto h-auto py-1"
          on:click={() => removeFromTable(movie.id)}><span class="i-ph-x text-xl" /></button
        >
      </div>
      <MovieBox movie={movie.expand.media.metadata}>
        <div slot="tooltip" class="mt-2">
          <div>
            Added by {movie.expand.user.name}
          </div>
          {#if userMedias[movie.media]}
            <table>
              {#each userMedias[movie.media] as userMedia}
                {#if userMedia.intent}
                  <tr>
                    <td class="p-1">
                      <IntentStatus value={userMedia.intent} />
                    </td>
                    <td class="px-2">
                      {userMedia.expand?.user?.name}
                    </td>
                  </tr>
                {/if}
              {/each}
            </table>
          {/if}
        </div>
      </MovieBox>
    </div>
  {/each}
</div>
<h2 class="text-center my-2 font-bold text-xl">Library</h2>

<main>
  <MovieFiltering {tabs} bind:query bind:tab />
  <div class="p-8">
    {#if tab === 'all'}
      <MovieGrid movies={results?.results ?? []}>
        <button class="btn btn-primary" slot="hover" let:id on:click={() => addToTable(id)}
          ><span class="i-ph-plus-bold" /> Suggest</button
        >
      </MovieGrid>
    {:else if $authModel}
      <UserMediaGrid userId={$authModel.id} category={tab} {query}>
        <button class="btn btn-primary" slot="hover" let:id on:click={() => addToTable(id)}
          ><span class="i-ph-plus-bold" /> Suggest</button
        >
      </UserMediaGrid>
    {/if}
  </div>
</main>
