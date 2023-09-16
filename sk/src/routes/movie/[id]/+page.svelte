<script lang="ts">
  import Intention from '$lib/components/Intention.svelte';
  import Poster from '$lib/components/Poster.svelte';
  import Title from '$lib/components/Title.svelte';
  import Tooltip from '$lib/components/Tooltip.svelte';
  import TooltipGroup from '$lib/components/TooltipGroup.svelte';
  import Watched from '$lib/components/Watched.svelte';
  import { coalesceCrew } from '$lib/tmdb/tmdb-util.js';
  import { formatDuration } from '$lib/util.js';

  export let data;

  $: movie = data.movie;
  $: [importantCrew, crew] = coalesceCrew(movie.credits.crew ?? []);

  let castExpanded = false;
  let crewExpanded = false;

  const langFormat = new Intl.DisplayNames(undefined, { type: 'language' });
  const currencyFormat = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'narrowSymbol',
    maximumFractionDigits: 0,
  });
</script>

<Title title={movie.title} />

<section class="relative flex items-end justify-center bg-base-subtle min-h-80">
  <div class="max-w-6xl px-2 w-full py-2 flex gap-8 items-end">
    <div class="mb--16">
      <Poster poster_path={movie.poster_path} />
    </div>
    <div class="flex-1">
      <p class="mb-4 text-fg-muted">{movie.overview}</p>
      <h2 class="text-3xl font-bold mb-1">
        {movie.title}{movie.release_date ? ` (${movie.release_date.split('-')[0]})` : ''}
      </h2>
    </div>
  </div>
</section>

<section class="max-w-6xl px-2 w-full mx-auto">
  <section class="ml-220px flex">
    {#if movie.id}
      <div class="flex items-center gap-2 ml-8">
        <Intention id={movie.id} value={movie.expand?.user_media?.intent} />
        <Watched id={movie.id} value={movie.expand?.user_media?.watches} />
      </div>
    {/if}
    <div class="ml-auto text-4xl flex gap-4 p-3 items-center leading-1">
      <TooltipGroup>
        {#if movie.homepage}
          <Tooltip>
            <a href={movie.homepage} rel="noreferrer">
              <span class="i-ph-globe" />
            </a>
            <div slot="tooltip" class="tooltip">Official website</div>
          </Tooltip>
        {/if}
        {#if movie.imdb_id}
          <Tooltip>
            <a href="https://www.imdb.com/title/{movie.imdb_id}" rel="noreferrer">
              <span class="i-simple-icons-imdb text-#F5C518" />
            </a>
            <div slot="tooltip" class="tooltip">IMDB</div>
          </Tooltip>
        {/if}

        <Tooltip>
          <a href="https://www.themoviedb.org/movie/{movie.id}" rel="noreferrer">
            <span class="i-simple-icons-themoviedatabase text-#01B4E4" />
          </a>
          <div slot="tooltip" class="tooltip">The Movie Database</div>
        </Tooltip>
      </TooltipGroup>
    </div>
  </section>
  <div class="mt-4 text-sm flex items-start gap-8">
    <dl class="flex flex-col gap-2 bg-base-muted text-fg-muted rounded-lg p-4 w-220px">
      <div>
        <dt class="font-bold">Status</dt>
        <dd>{movie.status}</dd>
      </div>
      {#if movie.release_date}
        <div>
          <dt class="font-bold">Released</dt>
          <dd>{movie.release_date}</dd>
        </div>
      {/if}
      {#if movie.runtime}
        <div>
          <dt class="font-bold">Duration</dt>
          <dd>{formatDuration(movie.runtime)}</dd>
        </div>
      {/if}
      {#if movie.original_title !== movie.title}
        <div>
          <dt class="font-bold">Original Title</dt>
          <dd>{movie.original_title}</dd>
        </div>
      {/if}
      {#if movie.original_language}
        <div>
          <dt class="font-bold">Original Language</dt>
          <dd>{langFormat.of(movie.original_language)}</dd>
        </div>
      {/if}
      {#if movie.genres}
        <div>
          <dt class="font-bold">Genres</dt>
          <dd>{movie.genres.map((g) => g.name).join(', ')}</dd>
        </div>
      {/if}
      {#if movie.production_companies}
        <div>
          <dt class="font-bold">Producers</dt>
          <dd>{movie.production_companies.map((c) => c.name).join(', ')}</dd>
        </div>
      {/if}
      {#if movie.budget}
        <div>
          <dt class="font-bold">Budget</dt>
          <dd>{currencyFormat.format(movie.budget)}</dd>
        </div>
      {/if}
      {#if movie.revenue}
        <div>
          <dt class="font-bold">Revenue</dt>
          <dd>{currencyFormat.format(movie.revenue)}</dd>
        </div>
      {/if}
    </dl>
    <div class="flex-1 flex flex-col gap-8">
      {#if movie.tagline}
        <blockquote
          class="border-l-4 border-l-border dark:border-l-base-subtle pl-2 py-1 text-fg-muted text-xl font-500 italic"
        >
          {movie.tagline}
        </blockquote>
      {/if}
      {#if movie.credits.crew}
        <div>
          <h3 class="mb-4 font-bold text-xl">Crew</h3>
          <dl class="divide-y divide-border text-sm">
            {#each importantCrew as person (person.id)}
              <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt class="font-500">{person.jobs.join(', ')}</dt>
                <dd>
                  {person.name}
                </dd>
              </div>
            {/each}
            {#if crewExpanded}
              {#each crew as person}
                <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt class="font-500">{person.job}</dt>
                  <dd>
                    {person.name}
                  </dd>
                </div>
              {/each}
            {/if}
          </dl>
          {#if crew.length > 0}
            <button class="btn link" on:click={() => (crewExpanded = !crewExpanded)}
              ><span class:i-ph-arrow-down={!crewExpanded} class:i-ph-arrow-up={crewExpanded} />
              {crewExpanded ? 'Show less' : 'Show more'}</button
            >
          {/if}
        </div>
      {/if}
      {#if movie.credits.cast}
        <div>
          <h3 class="mb-4 font-bold text-xl">Cast</h3>
          <dl class="divide-y divide-border text-sm">
            {#each castExpanded ? movie.credits.cast : movie.credits.cast.slice(0, 9) as person}
              <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt class="font-500">{person.character}</dt>
                <dd>
                  {person.name}
                </dd>
              </div>
            {/each}
          </dl>
          {#if movie.credits.cast.length > 9}
            <button class="btn link" on:click={() => (castExpanded = !castExpanded)}
              ><span class:i-ph-arrow-down={!castExpanded} class:i-ph-arrow-up={castExpanded} />
              {castExpanded ? 'Show less' : 'Show more'}</button
            >
          {/if}
        </div>
      {/if}
    </div>
  </div>
</section>
