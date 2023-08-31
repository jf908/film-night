<script lang="ts">
  export let value: string | null = null;
</script>

<div
  class="p-2 text-black rounded {$$props.class ?? ''}"
  class:bg-green-500={value === 'want'}
  class:bg-red-500={value === 'dont'}
>
  <span
    class="text-2xl"
    class:i-ph-thumbs-up-fill={value === 'want'}
    class:i-ph-thumbs-down-fill={value === 'dont'}
  />
</div>
