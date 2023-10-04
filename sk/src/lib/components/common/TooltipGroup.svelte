<script lang="ts">
  import { createRandomId } from '$lib/tooltip';
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';

  const showing = writable<string | null>(null);

  let timeout: NodeJS.Timeout | undefined;

  setContext('tooltip-group', {
    showing,
    groupTooltip: createRandomId(),
    showTooltip(id: string) {
      clearTimeout(timeout);
      timeout = undefined;
      $showing = id;
    },
    hideTooltip(id: string) {
      if ($showing === id && timeout === undefined) {
        timeout = setTimeout(() => {
          if ($showing === id) {
            $showing = null;
          }
          timeout = undefined;
        }, 100);
      }
    },
  });
</script>

<slot />
