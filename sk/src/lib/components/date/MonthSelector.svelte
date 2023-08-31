<script lang="ts">
  import { add, format } from 'date-fns';

  export let value: Date;
</script>

<div class="flex items-center">
  <button class="btn" on:click={() => (value = add(value, { months: -1 }))}>
    <span class="i-ph-caret-left" />
  </button>
  <span>{format(value, 'LLL y')}</span>
  <button class="btn" on:click={() => (value = add(value, { months: 1 }))}>
    <span class="i-ph-caret-right" />
  </button>
</div>
