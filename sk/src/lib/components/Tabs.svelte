<script lang="ts" generics="T">
  import { Tab, TabGroup, TabList } from '@rgossiaux/svelte-headlessui';

  export let value: T | undefined = undefined;
  export let options: { label: string; value: T; icon?: string; selectedClass?: string }[];
</script>

<TabGroup on:change={(e) => (value = options[e.detail].value)}>
  <TabList class="flex-inline p-1 bg-base-muted rounded-lg text-fg-muted">
    {#each options as option}
      <Tab
        class={({ selected }) =>
          `py-2 px-4 text-sm font-500 rounded ${
            selected ? ` shadow ${option.selectedClass}` : 'hover:text-fg'
          }`}
      >
        {#if option.icon}
          <span class="text-xl mr-1 {option.icon}" />
        {/if}
        {option.label}
      </Tab>
    {/each}
  </TabList>
</TabGroup>
