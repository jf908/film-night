<script>
  export let title = '';
</script>

<svelte:head>
  <title>{title ? `${title} • Film Night` : 'Film Night'}</title>
</svelte:head>
