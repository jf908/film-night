<script lang="ts">
  import Avatar from '$lib/components/common/Avatar.svelte';
  import Title from '$lib/components/page/Title.svelte';
  import { authModel, pb } from '$lib/pocketbase';

  let form: HTMLFormElement;
  let fileEl: HTMLInputElement;

  async function onSubmit(e: SubmitEvent) {
    changed = false;
    const formData = new FormData(form);
    await pb.collection('users').update($authModel?.id ?? '', formData);

    imageUrl = $authModel?.avatar && pb.files.getUrl($authModel, $authModel.avatar);
  }

  function onFileChange(event: Event & { currentTarget: HTMLInputElement }) {
    changed = true;
    const input = event.currentTarget;
    if (input.files && input.files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const result = e.target?.result;
        imageUrl = typeof result === 'string' ? result : '';
      };

      reader.readAsDataURL(input.files[0]);
    }
  }

  let changed = false;

  let imageUrl: string =
    ($authModel?.avatar && pb.files.getUrl($authModel, $authModel.avatar)) ?? '';
</script>

<Title title="Settings" />

<div class="w-full max-w-4xl mx-auto pt-4 px-2">
  <h2 class="font-bold mb-2 flex items-center"><span class="i-ph-gear text-lg mr-1" /> Settings</h2>
  <div class="bg-base-muted rounded-md p-5">
    <h3 class="font-bold mb-2">Change avatar</h3>
    {#if $authModel}
      <form class="flex flex-col" on:submit|preventDefault={onSubmit} bind:this={form}>
        <div class="flex gap-2">
          <label for="avatar" class="flex gap-2 items-center cursor-pointer">
            <Avatar class="text-2.5rem" image={imageUrl} />
          </label>
          <div class="flex flex-col gap-2">
            <input
              id="avatar"
              name="avatar"
              type="file"
              bind:this={fileEl}
              on:change={onFileChange}
            />
            <div>
              <button
                class="btn btn-primary"
                on:click|preventDefault={() => {
                  if (imageUrl !== '') {
                    changed = true;
                  }
                  imageUrl = '';
                  fileEl.value = '';
                }}>Clear</button
              >
            </div>
          </div>
        </div>
        <div class="flex justify-end">
          <button class="btn btn-primary mt-2" class:btn-disabled={!changed} disabled={!changed}
            >Save</button
          >
        </div>
      </form>
    {/if}
  </div>
</div>
