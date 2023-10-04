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
    <input type="text" class="input max-w-lg mx-auto" placeholder="Search..." bind:value={query} />
    <MovieGrid movies={results?.results ?? []} />
  {/if}
</main>
