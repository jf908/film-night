<script lang="ts" generics="T">
  import Radio from './common/Radio.svelte';

  export let tabs: { label: string; value: T; icon: string; selectedClass: string }[];
  export let tab: T;
  export let query: string;
</script>

<div
  class="w-full max-w-3xl flex flex-wrap justify-around md:justify-between items-center gap-2 mt-8 px-2 mb-8 mx-auto"
>
  <Radio options={tabs} bind:value={tab} />
  <input class="input w-full max-w-16rem" type="text" placeholder="Search..." bind:value={query} />
</div>
