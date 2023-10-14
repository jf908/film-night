<script lang="ts">
  export let image: string | null = null;
</script>

<div
  class="text-1.125rem w-2em h-2em flex justify-center items-center dark:bg-gray-700 bg-gray-400 rounded overflow-hidden {$$props.class ??
    ''}"
>
  {#if image}
    <img class="w-full h-full object-cover" src={image} alt="" />
  {:else}
    <span class="i-ph-user text-white" />
  {/if}
</div>
