<script lang="ts">
  import MovieBox from '$lib/components/MovieBox.svelte';
  import Avatar from '$lib/components/common/Avatar.svelte';
  import Title from '$lib/components/page/Title.svelte';
  import { pb } from '$lib/pocketbase';

  export let data;
</script>

<div class="flex flex-col items-center">
  <div class="flex justify-center p-5 mt-5 gap-5">
    {#if data.event.expand?.watching}
      <div class="flex">
        <MovieBox movie={data.event.expand.watching.metadata} showTitle={false} />
      </div>
    {/if}
    <div class="mt-4">
      <h2 class="text-2xl font-bold opacity-80">
        {new Date(data.event.datetime).toLocaleDateString(undefined, {
          dateStyle: 'full',
        })}
      </h2>
      <h3 class="text-3xl font-bold">
        {data.event.expand?.watching.metadata?.title}
      </h3>
      {#if data.event.description}
        <p class="max-w-sm mt-3">
          {@html data.event.description}
        </p>
      {/if}
      {#if data.event.expand?.attended}
        <h3 class="font-bold text-xl mb-2 mt-4">Attendees</h3>
        <div class="flex flex-col gap-2 w-full max-w-xs">
          {#each data.event.expand.attended as attendee}
            <a href="/user/{attendee.id}" class="hover:underline">
              <div class="flex gap-2 items-center">
                <Avatar
                  src={attendee.avatar}
                  image={attendee.avatar &&
                    pb.files.getUrl(attendee, attendee.avatar, { thumb: '100x100' })}
                />
                <div>{attendee.name}</div>
              </div>
            </a>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</div>

<Title title={new Date(data.event.datetime).toDateString()} />
