<script lang="ts" generics="T">
  import { RadioGroup, RadioGroupOption } from '@rgossiaux/svelte-headlessui';

  export let value: T | undefined = undefined;
  export let options: { label: string; value: T; icon?: string; selectedClass?: string }[];
</script>

<RadioGroup bind:value>
  <div class="flex-inline p-1 bg-base-muted rounded-lg text-fg-muted">
    {#each options as option}
      <RadioGroupOption value={option.value} let:checked>
        <div
          class="py-2 px-4 text-sm font-500 rounded cursor-pointer {checked
            ? ` shadow ${option.selectedClass}`
            : 'hover:text-fg'}"
        >
          {#if option.icon}
            <span class="text-xl mr-1 {option.icon}" />
          {/if}
          {option.label}
        </div>
      </RadioGroupOption>
    {/each}
  </div>
</RadioGroup>
