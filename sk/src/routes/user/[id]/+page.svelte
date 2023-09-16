<script lang="ts">
  import Avatar from '$lib/components/Avatar.svelte';
  import MovieGrid from '$lib/components/MovieGrid.svelte';
  import Pagination from '$lib/components/Pagination.svelte';
  import Title from '$lib/components/Title.svelte';
  import { watch } from '$lib/pocketbase';
  import type { MediaResponse, UserMediaResponse } from '$lib/pocketbase/pocketbase-types.js';

  export let data;

  function createFilter(value: string) {
    return `user.id = "${data.user.id}" && intent = "${value}"`;
  }

  const library = watch<UserMediaResponse<{ media: MediaResponse }>>('user_media', {
    filter: createFilter('want'),
    expand: 'media',
  });
</script>

<Title title={data.user.name} />

<section class="relative flex items-end justify-center bg-base-subtle min-h-40">
  <div class="max-w-xl w-full py-2 flex items-end gap-3">
    <div class="mb--6">
      <Avatar class="text-2.5rem" />
    </div>
    {data.user.name}
  </div>
</section>

<div class="p-8">
  <div class="flex gap-2 justify-center mb-8">
    <button class="btn btn-success" on:click={() => library.setFilter(createFilter('want'))}
      >Want</button
    >
    <button class="btn btn-danger" on:click={() => library.setFilter(createFilter('dont'))}
      >Don't want</button
    >
  </div>
  <MovieGrid
    movies={$library.items.map((m) => m.expand.media.metadata)}
    intents={$library.items.map((m) => m.intent)}
  />
  {#if $library.totalPages > 1}
    <div class="flex justify-center mt-4">
      <Pagination {...$library} on:setPage={(e) => library.setPage(e.detail)} />
    </div>
  {/if}
</div>
