<script lang="ts">
  import Splash from '$lib/components/Splash.svelte';
  import { authModel, pb } from '$lib/pocketbase';
  import type { MovieResultsResponse } from '../../hooks/movieDbTypes';
  import Title from '$lib/components/page/Title.svelte';
  import MovieGrid from '$lib/components/MovieGrid.svelte';
  import { throttle } from '$lib/util';

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
</script>

<Title />

<main class="p-5 mx-auto flex flex-col gap-8 w-full">
  {#if $authModel === null}
    <Splash />
  {:else}
    <div class="form-control max-w-lg w-full mx-auto">
      <label for="search" class="flex items-center font-medium text-fg-muted mb-2"
        ><span class="i-ph-magnifying-glass-bold text-lg mr-1" /> Search</label
      >
      <input
        id="search"
        type="text"
        class="input"
        placeholder="Search for a movie"
        bind:value={query}
      />
    </div>
    <MovieGrid movies={results?.results ?? []} />
  {/if}
</main>
