<script lang="ts">
  import { watch } from '$lib/pocketbase';
  import type { MediaResponse, UserMediaResponse } from '$lib/pocketbase/pocketbase-types';
  import MovieGrid from '$lib/components/MovieGrid.svelte';
  import Pagination from '$lib/components/common/Pagination.svelte';

  export let filter: string;

  const library = watch<UserMediaResponse<{ media: MediaResponse }>>('user_media', {
    filter,
    expand: 'media',
  });

  $: library.setFilter(filter);
</script>

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
