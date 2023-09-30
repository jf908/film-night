<script lang="ts">
  import Avatar from '$lib/components/Avatar.svelte';
  import MovieGrid from '$lib/components/MovieGrid.svelte';
  import Pagination from '$lib/components/Pagination.svelte';
  import Tabs from '$lib/components/Tabs.svelte';
  import Title from '$lib/components/Title.svelte';
  import { watch } from '$lib/pocketbase';
  import type { MediaResponse, UserMediaResponse } from '$lib/pocketbase/pocketbase-types.js';

  export let data;

  const tabs = [
    {
      label: 'Watched',
      value: 'watched',
      icon: 'i-ph-clock-clockwise',
      selectedClass: 'btn-primary',
    },
    { label: 'Want', value: 'want', icon: 'i-ph-thumbs-up', selectedClass: 'btn-success' },
    { label: "Don't want", value: 'dont', icon: 'i-ph-thumbs-down', selectedClass: 'btn-danger' },
  ] as const;
  let tab: (typeof tabs)[number]['value'] = 'watched';

  function createFilter(value: typeof tab, query: string) {
    const filter = [`user.id = "${data.user.id}"`];
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

  let query = '';
  $: filter = createFilter(tab, query);

  const library = watch<UserMediaResponse<{ media: MediaResponse }>>('user_media', {
    filter,
    expand: 'media',
  });

  $: library.setFilter(filter);
</script>

<Title title={data.user.name} />

<section class="relative flex items-end justify-center bg-base-subtle min-h-40">
  <div class="max-w-3xl w-full py-2 flex items-end gap-3 px-2">
    <div class="mb--6">
      <Avatar class="text-2.5rem" />
    </div>
    {data.user.name}
  </div>
</section>

<div
  class="w-full max-w-3xl flex flex-wrap justify-around md:justify-between items-center gap-2 mt-8 px-2 mb-8 mx-auto"
>
  <Tabs options={tabs} bind:value={tab} />
  <input class="input w-full max-w-16rem" type="text" placeholder="Search..." bind:value={query} />
</div>
<div class="p-8">
  <MovieGrid
    movies={$library.items.map((m) => m.expand.media.metadata)}
    intents={$library.items.map((m) => m.intent)}
  />
  {#if $library.items.length === 0}
    <p class="text-center">No content.</p>
  {/if}
  {#if $library.totalPages > 1}
    <div class="flex justify-center mt-4">
      <Pagination {...$library} on:setPage={(e) => library.setPage(e.detail)} />
    </div>
  {/if}
</div>
