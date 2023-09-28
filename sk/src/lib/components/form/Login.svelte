<script lang="ts">
  import { goto } from '$app/navigation';
  import { pb } from '$lib/pocketbase';
  import { dev } from '$app/environment';

  let passwordLoginEnabled = false;
  let username = '';
  let password = '';

  async function loginWithPassword(e: SubmitEvent) {
    await pb.collection('users').authWithPassword(username, password);
    goto('/');
  }

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
  {#if passwordLoginEnabled}
    <form on:submit|preventDefault={loginWithPassword}>
      <div class="form-control">
        <label class="label" for="username">
          <span class="label-text">Username</span>
        </label>
        <input id="username" class="input" type="text" required bind:value={username} />
      </div>

      <div class="form-control">
        <label class="label" for="password">
          <span class="label-text">Password</span>
        </label>
        <input id="password" class="input" type="password" required bind:value={password} />
      </div>

      <button class="btn btn-primary w-full mt-4">Login</button>
    </form>
  {/if}

  <button
    class="btn bg-#5865F2 hover:bg-#454FBF text-white w-full mt-4"
    on:click={() => loginWithDiscord()}><span class="i-simple-icons-discord" /> Discord</button
  >
  {#if dev}
    <button class="btn w-full mt-4" on:click={devLogin}>Dev Login</button>
  {/if}
  <p class="mt-4 text-sm text-center">
    <a href="/register" class="link">Create account</a>
  </p>
</div>
