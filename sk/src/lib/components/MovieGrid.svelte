<script lang="ts">
  import type { MovieResponse } from '../../../hooks/movieDbTypes';
  import MovieBox from './MovieBox.svelte';

  export let movies: MovieResponse[];
  export let intents: (string | null)[] = [];
</script>

<div class="grid gap-4">
  {#each movies as movie, i (movie.id)}
    <div class="flex justify-center">
      <MovieBox {movie} intent={intents[i]} />
    </div>
  {/each}
</div>

<style>
  .grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
</style>
