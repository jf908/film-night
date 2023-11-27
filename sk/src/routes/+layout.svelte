<script lang="ts">
  import Footer from '$lib/components/page/Footer.svelte';
  import Nav from '$lib/components/page/Nav.svelte';
  import Title from '$lib/components/page/Title.svelte';
  import '@unocss/reset/tailwind.css';
  import 'uno.css';
</script>

<Title />
<Nav />
<slot />
<Footer class="mt-auto" />

<style>
  :global(body) {
    @apply font-sans bg-base text-fg flex flex-col;
    min-height: 100vh;
  }
</style>
