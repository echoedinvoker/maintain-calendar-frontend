<template>
  <div :class="`text-slate-100 px-2 py-1 w-full h-full rounded-md ${Color[event.id % 4]}`" @click="handleClick">
    <h3 class="text-xl tracking-normal font-bold text-nowrap">{{ event.title }}</h3>
    <p class="text-nowrap text-slate-300 text-sm flex items-center">
      <mdicon name="TimerOutline" class="inline-block mr-1" size="18"></mdicon><span>{{ event.time.start.toLocaleString()
      }} -
        {{ event.time.end.toLocaleString() }}</span>
    </p>
    <p class="text-nowrap flex items-center">
      <mdicon name="account" class="inline-block mr-1" size="18"></mdicon>
      {{ event.operator }}
    </p>
    <p class="text-nowrap flex items-center">
      <mdicon :name="event.status === 'normal'
        ? Status[1] : event.status === 'danger'
          ? Status[2] : Status[0]" class="inline-block mr-1" size="18"></mdicon>
      {{ event.status }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useMaintainStore } from '@/stores/useMaintainStore';
import { Color } from '@/types/colors'
enum Status { 'alertCircle', 'arrowRightDropCircle', 'closeCircle' }

const props = defineProps<{
  event: CalendarMaintain
}>()

const maintainStore = useMaintainStore()

function handleClick() {
  maintainStore.dispatch({ type: 'update-current-id', payload: props.event.id })
}
</script>
