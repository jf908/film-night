<script lang="ts">
  import { pb } from '$lib/pocketbase';
  import { resolveMovie } from '../api';
  import Tooltip from './common/Tooltip.svelte';
  import TooltipGroup from './common/TooltipGroup.svelte';

  export let id: number;
  export let value: string | null = null;

  async function setIntent(newValue: string | null) {
    const movie = await resolveMovie(id);
    const userMedia = pb.collection('user_media');
    let media;
    try {
      media = await userMedia.getFirstListItem(
        `user.id = "${pb.authStore.model?.id}" && media.id = "${movie}"`
      );
    } catch (err) {
      await userMedia.create({ user: pb.authStore.model?.id, media: movie, intent: newValue });
      value = newValue;
      return;
    }

    await userMedia.update(media.id, { intent: newValue });
    value = newValue;
  }
</script>

<TooltipGroup>
  <menu class="flex bg-base-muted rounded p-1">
    <li>
      <Tooltip>
        <button
          class="btn p-3 bg-base-muted transition-colors"
          class:want-active={value === 'want'}
          on:click={() => setIntent('want')}><span class="text-xl i-ph-thumbs-up-fill" /></button
        >
        <div slot="tooltip" class="tooltip">I want to watch this</div>
      </Tooltip>
    </li>
    <li>
      <Tooltip>
        <button class="btn p-3 bg-base-muted hover:bg-base-subtle" on:click={() => setIntent(null)}
          ><span class="text-xl i-ph-minus" /></button
        >
        <div slot="tooltip" class="tooltip">No opinion</div>
      </Tooltip>
    </li>
    <li>
      <Tooltip>
        <button
          class="btn p-3 bg-base-muted hover:bg-base-subtle"
          class:dont-active={value === 'dont'}
          on:click={() => setIntent('dont')}><span class="text-xl i-ph-thumbs-down-fill" /></button
        >
        <div slot="tooltip" class="tooltip">I don't want to watch this</div>
      </Tooltip>
    </li>
  </menu>
</TooltipGroup>

<style>
  .want-active {
    --at-apply: bg-green-600 text-white hover\:bg-green-500;
    animation: pulse 0.25s ease-out;
  }
  .dont-active {
    --at-apply: bg-red-600 text-white hover\:bg-red-500;
    animation: pulse 0.25s ease-out;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
