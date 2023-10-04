<script lang="ts">
  import { Menu, MenuButton, MenuItems } from '@rgossiaux/svelte-headlessui';
</script>

<div class="menu inline-block">
  <Menu class="relative">
    <MenuButton><slot name="button" /></MenuButton>
    <MenuItems
      class="menu-items absolute end-0 z-10 mt-2 w-56 divide-y divide-gray-700 rounded-md border border-border-muted bg-base dark:bg-base-muted shadow-lg"
    >
      <slot />
    </MenuItems>
  </Menu>
</div>

<style>
  .menu :global(.menu-items > * > * > *) {
    --apply-at: flex rounded-lg px-4 py-2 text-sm hover\:bg-base-subtle cursor-pointer;
  }
</style>
