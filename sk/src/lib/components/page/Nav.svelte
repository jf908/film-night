<script lang="ts">
  import { authModel, pb } from '$lib/pocketbase';
  import { theme } from '$lib/store/dark';
  import { MenuItem } from '@rgossiaux/svelte-headlessui';
  import Avatar from '../common/Avatar.svelte';
  import Menu from '../common/Menu.svelte';
</script>

<nav class="flex gap-1 px-2 items-center min-h-60px bg-base-muted">
  <a
    href="/"
    class="flex items-center gap-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded px-2 py-1 select-none"
  >
    <img class="dark-invert" src="/icon.svg" alt="" />
    <h1 class="font-bold text-xl">Film Night</h1>
  </a>
  {#if $authModel}
    <a
      href="/calendar"
      class="text-sm hover:bg-gray-200 dark:hover:bg-gray-700 rounded p-2 flex items-center gap-1"
      ><span class="i-ph-calendar text-xl" />Calendar</a
    >
    <a
      href="/table"
      class="text-sm hover:bg-gray-200 dark:hover:bg-gray-700 rounded p-2 flex items-center gap-1"
      ><span class="i-ph-chart-pie text-xl" /> Round Table</a
    >
  {/if}
  <div class="ml-auto" />
  {#if $authModel}
    <a
      href="/"
      class="ml-auto hover:bg-gray-200 dark:hover:bg-gray-700 rounded p-2 flex items-center gap-1"
      ><span class="i-ph-magnifying-glass text-xl" /></a
    >
  {/if}
  <button
    class="flex items-center p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded select-none"
    on:click={() => theme.toggle()}
    ><span
      class="text-xl"
      class:i-ph-moon={$theme === 'dark'}
      class:i-ph-sun={$theme === 'light'}
    /></button
  >
  {#if $authModel}
    <Menu>
      <Avatar
        slot="button"
        image={$authModel.avatar &&
          pb.files.getUrl($authModel, $authModel.avatar, { thumb: '100x100' })}
      />
      <div class="p-2">
        <MenuItem>
          <a href="/user/{$authModel.id}">Profile</a>
        </MenuItem>
        <MenuItem>
          <a href="/settings">Settings</a>
        </MenuItem>
        <MenuItem>
          <a href="/logout" data-sveltekit-preload-data="false">Logout</a>
        </MenuItem>
      </div>
    </Menu>
  {:else}
    <a href="/login" class="text-sm hover:bg-gray-200 dark:hover:bg-gray-700 rounded p-2">Login</a>
    <a href="/register" class="text-sm rounded p-2 btn-primary">Sign up</a>
  {/if}
</nav>
