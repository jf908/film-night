<script lang="ts">
  import { add, format } from 'date-fns';

  export let value: Date;
</script>

<div class="flex items-center gap-2 text-sm">
  <button class="btn py-1 min-h-auto h-auto" on:click={() => (value = add(value, { months: -1 }))}>
    <span class="i-ph-caret-left text-lg" />
  </button>
  <span>{format(value, 'LLL y')}</span>
  <button class="btn py-1 min-h-auto h-auto" on:click={() => (value = add(value, { months: 1 }))}>
    <span class="i-ph-caret-right text-lg" />
  </button>
</div>
