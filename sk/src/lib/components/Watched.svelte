<script lang="ts">
  import { resolveMovie } from '$lib/api';
  import { pb } from '$lib/pocketbase';

  export let id: number;
  export let value: number = 0;

  async function setWatched(newValue: number) {
    const movie = await resolveMovie(id);
    const userMedia = pb.collection('user_media');
    let media;
    try {
      media = await userMedia.getFirstListItem(
        `user.id = "${pb.authStore.model?.id}" && media.id = "${movie}"`
      );
    } catch (err) {
      await userMedia.create({ user: pb.authStore.model?.id, media: movie, watches: newValue });
      value = newValue;
      return;
    }

    await userMedia.update(media.id, { watches: newValue });
    value = newValue;
  }
</script>

<div>
  {#if value === null || value === 0}
    <button class="btn btn-primary min-h-12" on:click={() => setWatched(1)}>Mark as watched</button>
  {:else}
    <div class="bg-base-muted flex items-center rounded">
      <div class="px-4 text-sm font-500">
        Watched {value} time{value > 1 ? 's' : ''}
      </div>
      <div class="flex flex-col">
        <button class="btn px-3 py-0 h-0 min-h-1.5rem" on:click={() => setWatched(value + 1)}>
          <span class="i-ph-plus" />
        </button>
        <button class="btn px-3 py-0 h-0 min-h-1.5rem" on:click={() => setWatched(value - 1)}>
          <span class="i-ph-minus" />
        </button>
      </div>
    </div>
  {/if}
</div>
