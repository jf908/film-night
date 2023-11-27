<script lang="ts">
  export let poster_path: string | undefined;
  export let size: 'sm' | 'md' = 'md';
  export let responsive = false;

  $: width = size === 'md' ? 220 : 110;
  $: height = size === 'md' ? 330 : 165;
</script>

<div
  style="height: {height}px; {responsive ? `max-height: ${height}px` : ''}"
  class="relative rounded-lg aspect-[2/3] bg-gray-200 flex items-center justify-center {responsive
    ? 'h-full! max-w-full w-auto'
    : ''} {$$props.class ?? ''}"
>
  {#if poster_path}
    <img
      class="w-full h-full rounded-lg"
      {width}
      {height}
      src="https://image.tmdb.org/t/p/w220_and_h330_face/{poster_path}"
      srcset="https://image.tmdb.org/t/p/w220_and_h330_face/{poster_path} 1x, https://image.tmdb.org/t/p/w440_and_h660_face/{poster_path} 2x"
      alt=""
    />
  {:else}
    <span class="i-ph-image text-6xl bg-gray-500" />
  {/if}
  <slot />
</div>
