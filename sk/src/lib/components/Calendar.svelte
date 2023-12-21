<script lang="ts">
  import {
    add,
    differenceInDays,
    endOfWeek,
    format,
    getDaysInMonth,
    isSameDay,
    isToday,
    startOfMonth,
    startOfWeek,
  } from 'date-fns';
  import MovieBox from './MovieBox.svelte';
  import type { FullEvent } from '$lib/event';

  export let events: FullEvent[];
  export let startDate = startOfMonth(new Date());

  type Day = {
    date: Date;
    events: FullEvent[];
  };

  $: days = Array.from({ length: getDaysInMonth(startDate) }).map((_, i) => {
    const date = add(startDate, { days: i });
    return {
      date,
      events: events.filter((record) => {
        return isSameDay(new Date(record.datetime), date);
      }),
    };
  });

  function createGridElements(days: Day[]) {
    const firstDay = startOfWeek(days[0].date);
    const lastDay = endOfWeek(days[days.length - 1].date);

    return [
      ...Array.from({ length: differenceInDays(days[0].date, firstDay) }).fill(null),
      ...days,
      ...Array.from({ length: differenceInDays(lastDay, days[days.length - 1].date) }).fill(null),
    ] as (Day | null)[];
  }

  $: gridElements = createGridElements(days);

  $: weekDays = Array.from({ length: 7 }).map((_, i) => {
    return format(add(startOfWeek(days[0].date), { days: i }), 'EEE');
  });
</script>

<div
  class="flex flex-col md:grid grid-cols-7 gap-1px bg-border border-border border-1 h-auto md:min-h-[calc(100vh-114px)]"
  style="grid-template-rows: 1.2rem"
>
  {#each weekDays as day}
    <div class="mx--1 mt--1 text-center bg-base hidden md:block text-sm">
      {day}
    </div>
  {/each}
  {#each gridElements as day}
    <div
      class="p-4 md:p-0 md:flex flex-col bg-base overflow-hidden relative min-h-8rem"
      class:hidden={!day?.events.length}
      class:flex={!!day?.events.length}
    >
      {#if day}
        {@const today = isToday(day.date)}
        <div
          class="p-1 leading-4 text-right absolute top-1 right-1 text-sm"
          class:bg-red-600={today}
          class:rounded-full={today}
          class:font-bold={today}
          class:text-white={today}
        >
          {day.date.getDate()}
        </div>
        <div class="flex px-1 pb-1 pt-6 justify-center md:absolute w-full h-full gap-2">
          {#each day.events as event}
            {#if event.expand?.watching.metadata}
              <MovieBox
                movie={event.expand.watching.metadata}
                href="/event/{event.id}"
                size="sm"
                responsive
                overlay
                class="flex justify-center"
              >
                <div slot="tooltip" class="mt-4 text-sm">
                  {#if event.expand.attended}
                    Attended by: {event.expand.attended.map((u) => u.name).join(', ')}
                  {/if}
                </div>
              </MovieBox>
            {/if}
          {/each}
        </div>
      {/if}
    </div>
  {/each}
  {#if events.length === 0}
    <div class="bg-base p-3 block md:hidden">Nothing this month</div>
  {/if}
</div>
