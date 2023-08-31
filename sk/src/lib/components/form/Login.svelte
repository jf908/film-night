<script lang="ts">
  import { goto } from '$app/navigation';
  import { pb } from '$lib/pocketbase';
  import { dev } from '$app/environment';

  async function loginWithDiscord() {
    await pb.collection('users').authWithOAuth2({ provider: 'discord' });
    goto('/');
  }

  async function devLogin() {
    await pb.collection('users').authWithPassword('asdf', 'asdfasdf');
    goto('/');
  }
</script>

<div class="card max-w-md mx-auto">
  <section class="prose text-center">
    <h3>Login</h3>
  </section>
  <div class="form-control">
    <label class="label" for="username">
      <span class="label-text">Username</span>
    </label>
    <input id="username" class="input" type="text" />
  </div>

  <div class="form-control">
    <label class="label" for="password">
      <span class="label-text">Password</span>
    </label>
    <input id="password" class="input" type="password" />
  </div>

  {#if dev}
    <button class="btn w-full" on:click={devLogin}>Dev Login</button>
  {/if}
  <button class="btn btn-primary w-full mt-4">Login</button>
  <p class="mt-4 text-sm text-center">
    <a href="/register" class="link">Create account</a>
  </p>
</div>
