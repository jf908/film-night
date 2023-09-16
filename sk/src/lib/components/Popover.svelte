<script lang="ts">
  import { createTooltip, type TooltipOptions } from '$lib/tooltip';
  import { createEventDispatcher } from 'svelte';
  import { clickOutsideAction } from 'svelte-legos';

  export let options: TooltipOptions = {};

  const [tooltipLabel, tooltip] = createTooltip({ placement: 'bottom', ...options });

  let showPopover = false;

  const dispatch = createEventDispatcher();

  function toggle() {
    showPopover = !showPopover;
    if (showPopover) {
      dispatch('open');
    }
  }

  function handleClickOutside() {
    showPopover = false;
  }
</script>

<button class={$$props.class ?? ''} on:click={toggle} use:tooltipLabel>
  <slot />
</button>

{#if showPopover}
  <div class="fixed z-5" use:tooltip use:clickOutsideAction on:clickoutside={handleClickOutside}>
    <slot name="popover" />
  </div>
{/if}
