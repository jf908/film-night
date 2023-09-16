<script lang="ts">
  import { goto } from '$app/navigation';
  import { pb } from '$lib/pocketbase';

  async function loginWithDiscord() {
    await pb.collection('users').authWithOAuth2({ provider: 'discord' });
    goto('/');
  }
</script>

<div class="card max-w-md mx-auto">
  <section class="prose text-center">
    <h3>Sign up</h3>
  </section>

  <button
    class="btn bg-#5865F2 hover:bg-#454FBF text-white w-full mt-4"
    on:click={() => loginWithDiscord()}><span class="i-simple-icons-discord" /> Discord</button
  >
  <!-- <div class="form-control">
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

  <button class="btn btn-primary w-full mt-4">Create account</button> -->

  <p class="mt-4 text-sm text-center">
    <a href="/login" class="link">Login</a>
  </p>
</div>
