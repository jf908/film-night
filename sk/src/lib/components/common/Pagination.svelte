<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let totalPages: number;
  export let page: number;

  const dispatch = createEventDispatcher();
</script>

<div class="flex items-center gap-1">
  <button
    class="btn"
    class:btn-disabled={page <= 0}
    disabled={page <= 0}
    on:click={() => dispatch('setPage', page - 1)}
  >
    <span class="i-ph-caret-left text-xl" />
  </button>
  <span>{page}</span>
  /
  <span>{totalPages}</span>
  <button
    class="btn"
    class:btn-disabled={page >= totalPages}
    disabled={page >= totalPages}
    on:click={() => dispatch('setPage', page + 1)}
  >
    <span class="i-ph-caret-right text-xl" />
  </button>
</div>
