<script lang="ts">
  import {
    createRandomId,
    createTooltip,
    type TooltipContext,
    type TooltipOptions,
  } from '$lib/tooltip';
  import { getContext } from 'svelte';
  import { flip } from 'svelte/animate';
  import { quintOut } from 'svelte/easing';
  import { writable } from 'svelte/store';
  import { crossfade } from 'svelte/transition';

  export let options: TooltipOptions = {};

  const [tooltipLabel, tooltip] = createTooltip(options);

  const ctx = getContext<TooltipContext | undefined>('tooltip-group');
  const id = createRandomId();
  const showStore = writable<string | null>(null);
  const ctxShowing = ctx?.showing ?? showStore;

  const [send, receive] = crossfade({
    fallback(node, params) {
      const style = getComputedStyle(node);
      const transform = style.transform === 'none' ? '' : style.transform;

      return {
        duration: 200,
        easing: quintOut,
        css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`,
      };
    },
  });

  function onMouseEnter() {
    if (ctx) {
      ctx.showTooltip(id);
    } else {
      $showStore = id;
    }
  }

  function onMouseLeave() {
    if (ctx) {
      ctx.hideTooltip(id);
    } else {
      $showStore = null;
    }
  }

  $: showing = ctx
    ? $ctxShowing === id
      ? [ctx.groupTooltip]
      : []
    : $showStore === id
    ? [$showStore]
    : [];
</script>

<div
  class={$$props.class ?? ''}
  on:mouseenter={onMouseEnter}
  on:mouseleave={onMouseLeave}
  use:tooltipLabel
>
  <slot />
</div>

{#each showing as k (k)}
  <div
    class="fixed z-10"
    use:tooltip
    in:receive={{ key: k }}
    out:send={{ key: k }}
    animate:flip={{ duration: 200 }}
  >
    <slot name="tooltip" />
  </div>
{/each}
