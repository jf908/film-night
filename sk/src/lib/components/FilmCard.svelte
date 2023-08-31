<script lang="ts">
  import type { MovieResponse } from '../../../hooks/movieDbTypes';

  export let film: MovieResponse;
</script>

<div class="card flex gap-2">
  <div>
    <img
      src="https://image.tmdb.org/t/p/w220_and_h330_face/{film.poster_path}"
      srcset="https://image.tmdb.org/t/p/w220_and_h330_face/{film.poster_path} 1x, https://image.tmdb.org/t/p/w440_and_h660_face/{film.poster_path} 2x"
      alt=""
    />
  </div>
  <div class="flex-1">
    <h3 class="font-bold text-lg">{film.title}</h3>
    <p class="text-xs">{film.release_date}</p>
    <p class="text-sm">{film.overview}</p>
  </div>
  <a href="/movie/{film.id}">Go</a>
</div>
