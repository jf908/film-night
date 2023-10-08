<script lang="ts">
  import { pb } from '$lib/pocketbase';
  import type { UserMediaResponse } from '$lib/pocketbase/pocketbase-types';
  import Intention from './Intention.svelte';
  import Popover from './common/Popover.svelte';
  import Watched from './Watched.svelte';
  import { fade } from 'svelte/transition';

  export let id: number;

  let userMedia: UserMediaResponse | null = null;

  async function loadData() {
    const movie = await pb
      .collection('media')
      .getFirstListItem(`tmdb_id = "${id}" && type = "movie"`);
    const userMediaCol = pb.collection('user_media');
    userMedia = await userMediaCol.getFirstListItem(
      `user.id = "${pb.authStore.model?.id}" && media.id = "${movie.id}"`
    );
  }
</script>

<Popover
  class="btn bg-white dark:bg-black text-3xl px-1 rounded {$$props.class ?? ''}"
  options={{ placement: 'bottom-end' }}
  on:open={loadData}
>
  <span class="i-ph-dots-three-bold" />
  <div slot="popover" class="flex flex-col gap-2 items-end" transition:fade={{ duration: 100 }}>
    <Intention {id} value={userMedia?.intent} />
    <Watched {id} value={userMedia?.watches} />
  </div>
</Popover>
