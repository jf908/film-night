<script lang="ts">
  import { formatDuration } from '$lib/util';
  import { format, parseISO } from 'date-fns';
  import type { MovieResponse } from '../../../hooks/movieDbTypes';
  import Poster from './Poster.svelte';
  import Tooltip from './common/Tooltip.svelte';
  import Badge from './common/Badge.svelte';
  import IntentStatus from './IntentStatus.svelte';
  import MovieDots from './MovieDots.svelte';

  export let movie: MovieResponse;
  export let intent: string | null = null;
  export let size: 'sm' | 'md' = 'md';
</script>

<Tooltip options={{ placement: 'right' }} class="group relative">
  <a
    class="relative flex flex-col gap-1 text-fg-muted hover:text-link-accent"
    href="/movie/{movie.id}"
    data-sveltekit-preload-data="tap"
  >
    {#if intent}
      <IntentStatus value={intent} class="absolute z-1 left--2 top--2" />
    {/if}
    <Poster poster_path={movie.poster_path} {size} />
    <div class="text-sm font-500" class:w-220px={size === 'md'} class:w-110px={size === 'sm'}>
      {movie.title}
    </div>
  </a>
  {#if movie.id}
    <div class="absolute right-1 top-1 invisible group-hover:visible flex flex-col items-end gap-2">
      <slot name="hover" />
      <MovieDots id={movie.id} />
    </div>
  {/if}
  <div slot="tooltip" class="bg-black text-white rounded p-6 shadow-xl">
    {#if movie.release_date}
      <div class="text-xl">{format(parseISO(movie.release_date), 'Y MMM')}</div>
    {/if}
    {#if movie.runtime}
      <div class="text-sm">
        {formatDuration(movie.runtime)}
      </div>
    {/if}
    {#if movie.genres}
      <div class="mt-4 flex flex-wrap gap-1">
        {#each movie.genres as genre}
          <Badge class="text-xs">{genre.name}</Badge>
        {/each}
      </div>
    {/if}
    <slot name="tooltip" />
  </div>
</Tooltip>
