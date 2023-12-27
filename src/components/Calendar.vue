<template>
  <Qalendar @updated-period="handlePeriod" @updated-mode="handleMode" @interval-was-clicked="handleInterval"
    @date-was-clicked="handleClickDate" class="bg-slate-100 rounded-md" :events="maintainStore.state.events"
    :config="maintainStore.state.config">
    <template #weekDayEvent="{ eventData }">
      <WeekDayEvent :event="eventData" />
    </template>
    <template #monthEvent="{ eventData }">
      <MonthEvent :event="eventData" />
    </template>
    <template #eventDialog="{ eventDialogData, closeEventDialog }">
      <MaintainDetails :event="eventDialogData" :close="closeEventDialog" />
    </template>
  </Qalendar>
</template>

<script setup lang="ts">
import { useMaintainStore } from "@/stores/useMaintainStore";
import MonthEvent from "./features/event/MonthEvent.vue";
import WeekDayEvent from "./features/event/WeekDayEvent.vue";
import MaintainDetails from "./features/maintain/MaintainDetails.vue";
import { Qalendar } from "qalendar";
const maintainStore = useMaintainStore()

function handleInterval(event: { intervalStart: string, intervalEnd: string }) {
  maintainStore.dispatch({ type: 'update-dob', payload: [new Date(event.intervalStart), new Date(event.intervalEnd)] })
  maintainStore.dispatch({ type: 'init-current-id' })
  maintainStore.dispatch({ type: 'open-dialog' })
}
function handleClickDate(event: string) {
  maintainStore.dispatch({ type: 'update-dob', payload: [new Date(event + ' 00:00'), new Date(event + ' 23:59')] })
  maintainStore.dispatch({ type: 'init-current-id' })
  maintainStore.dispatch({ type: 'open-dialog' })
}

function handlePeriod(event: any) {
  console.log(event);
}
function handleMode(event: any) {
  console.log(event.period.start);

}
</script>

<style>
@import "qalendar/dist/style.css";
</style>
