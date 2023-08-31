<script lang="ts">
  import Calendar from '$lib/components/Calendar.svelte';
  import MonthSelector from '$lib/components/date/MonthSelector.svelte';
  import type { FullEvent } from '$lib/event';
  import { pb } from '$lib/pocketbase';
  import { endOfMonth, formatISO, startOfMonth } from 'date-fns';

  const events = pb.collection('event');

  let startDate = startOfMonth(new Date());

  let records: FullEvent[] = [];

  events
    .getFullList<FullEvent>({
      filter: `datetime >= "${formatISO(startDate, {
        representation: 'date',
      })}" && datetime <= "${formatISO(endOfMonth(startDate), {
        representation: 'date',
      })}"`,
      expand: 'watching,attended',
    })
    .then((res) => {
      records = res;
    });
</script>

<div class="flex flex-col gap-2 items-center p-2">
  <MonthSelector bind:value={startDate} />
  <div>
    <Calendar {startDate} events={records} />
  </div>
</div>
