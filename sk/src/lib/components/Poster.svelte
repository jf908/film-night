<script lang="ts">
  export let poster_path: string | undefined;
  export let size: 'sm' | 'md' = 'md';
</script>

{#if poster_path}
  <img
    class="rounded-lg"
    width={size === 'md' ? 220 : 110}
    height={size === 'md' ? 330 : 165}
    src="https://image.tmdb.org/t/p/w220_and_h330_face/{poster_path}"
    srcset="https://image.tmdb.org/t/p/w220_and_h330_face/{poster_path} 1x, https://image.tmdb.org/t/p/w440_and_h660_face/{poster_path} 2x"
    alt=""
  />
{:else}
  <div class="rounded-lg w-220px h-330px bg-gray-200 flex items-center justify-center">
    <span class="i-ph-image text-6xl bg-gray-500" />
  </div>
{/if}
