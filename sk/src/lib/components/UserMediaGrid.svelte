<script lang="ts">
  import { watch } from '$lib/pocketbase';
  import {
    UserMediaIntentOptions,
    type MediaResponse,
    type UserMediaResponse,
  } from '$lib/pocketbase/pocketbase-types';
  import MovieGrid from '$lib/components/MovieGrid.svelte';
  import Pagination from '$lib/components/common/Pagination.svelte';

  export let userId: string;
  export let category: 'watched' | 'want' | 'dont';
  export let query = '';

  function createFilter(value: typeof category, query: string) {
    const filter = [`user.id = "${userId}"`];
    if (value === 'watched') {
      filter.push('watches >= 1');
    } else {
      filter.push(`intent = "${value}"`);
    }

    if (query) {
      filter.push(`media.metadata.title ~ "${query}"`);
    }

    return filter.join(' && ');
  }

  $: filter = createFilter(category, query);

  const library = watch<UserMediaResponse<{ media: MediaResponse }>>(
    'user_media',
    {
      filter,
      expand: 'media',
    },
    {
      updateFilter(record) {
        return (
          record.user === userId &&
          (!(category === 'watched') || record.watches >= 1) &&
          (!(category === 'want') || record.intent === UserMediaIntentOptions.want) &&
          (!(category === 'dont') || record.intent === UserMediaIntentOptions.dont)
        );
      },
    }
  );

  $: library.setFilter(filter);
</script>

<MovieGrid
  movies={$library.items.map((m) => m.expand.media.metadata)}
  intents={$library.items.map((m) => m.intent)}
>
  <slot name="hover" slot="hover" let:id {id} />
</MovieGrid>
{#if $library.items.length === 0}
  <p class="text-center">No content.</p>
{/if}
{#if $library.totalPages > 1}
  <div class="flex justify-center mt-4">
    <Pagination {...$library} on:setPage={(e) => library.setPage(e.detail)} />
  </div>
{/if}
