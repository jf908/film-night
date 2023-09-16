<script lang="ts">
  import { add, format } from 'date-fns';

  export let value: Date;
</script>

<div class="flex items-center gap-2">
  <button class="btn" on:click={() => (value = add(value, { months: -1 }))}>
    <span class="i-ph-caret-left text-xl" />
  </button>
  <span>{format(value, 'LLL y')}</span>
  <button class="btn" on:click={() => (value = add(value, { months: 1 }))}>
    <span class="i-ph-caret-right text-xl" />
  </button>
</div>
