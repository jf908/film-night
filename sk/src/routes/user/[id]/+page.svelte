<script lang="ts">
  import Avatar from '$lib/components/common/Avatar.svelte';
  import MovieFiltering from '$lib/components/MovieFiltering.svelte';
  import Title from '$lib/components/page/Title.svelte';
  import UserMediaGrid from '$lib/components/UserMediaGrid.svelte';

  export let data;

  const tabs = [
    {
      label: 'Watched',
      value: 'watched',
      icon: 'i-ph-clock-clockwise',
      selectedClass: 'btn-primary',
    },
    { label: 'Want', value: 'want', icon: 'i-ph-thumbs-up', selectedClass: 'btn-success' },
    { label: "Don't want", value: 'dont', icon: 'i-ph-thumbs-down', selectedClass: 'btn-danger' },
  ] as const;
  let tab: (typeof tabs)[number]['value'] = 'watched';

  function createFilter(value: typeof tab, query: string) {
    const filter = [`user.id = "${data.user.id}"`];
    if (value === 'watched') {
      filter.push('watches >= 1');
    } else {
      filter.push(`intent = "${value}"`);
    }

    if (query) {
      filter.push(`media.metadata.title ~ "${query}"`);
    }

    return filter.join(' && ');
  }

  let query = '';
  $: filter = createFilter(tab, query);
</script>

<Title title="{data.user.name}'s profile" />

<section class="relative flex items-end justify-center bg-base-subtle min-h-40">
  <div class="max-w-3xl w-full py-2 flex items-end gap-3 px-2">
    <div class="mb--6">
      <Avatar class="text-2.5rem" />
    </div>
    {data.user.name}
  </div>
</section>

<MovieFiltering {tabs} bind:query bind:tab />
<div class="p-8">
  <UserMediaGrid userId={data.user.id} category={tab} {query} />
</div>
