<script lang="ts">
  import Avatar from '$lib/components/common/Avatar.svelte';
  import MovieFiltering from '$lib/components/MovieFiltering.svelte';
  import Title from '$lib/components/page/Title.svelte';
  import UserMediaGrid from '$lib/components/UserMediaGrid.svelte';
  import { pb } from '$lib/pocketbase/index.js';

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
  <div class="max-w-3xl w-full py-2 flex items-end gap-4 px-2">
    <div class="mb--6">
      <Avatar
        class="text-4rem"
        image={data.user.avatar && pb.files.getUrl(data.user, data.user.avatar)}
      />
    </div>
    <h2 class="font-bold text-2xl mb-1">{data.user.name}</h2>
  </div>
</section>

<div class="w-full max-w-3xl mx-auto px-2 mt-8 mb-2 text-fg-muted">
  <h3 class="font-medium"><span class="i-ph-bookmarks-bold text-xl" /> Library</h3>
</div>
<MovieFiltering class="mb-8" {tabs} bind:query bind:tab />
<div class="p-8">
  <UserMediaGrid userId={data.user.id} category={tab} {query} />
</div>
