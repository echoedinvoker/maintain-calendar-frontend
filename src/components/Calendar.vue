<template>
  <Qalendar class="bg-slate-100 rounded-md" :events="eventStore.state.events" :config="eventStore.state.config">
    <template #weekDayEvent="{ eventData }">
      <WeekDayEvent :event="eventData" />
    </template>
    <template #monthEvent="{ eventData }">
      <MonthEvent :event="eventData" />
    </template>
    <template #eventDialog="{ eventDialogData, closeEventDialog }">
      <EventDetails :event="eventDialogData" :close="closeEventDialog" />
    </template>
  </Qalendar>
</template>

<script setup lang="ts">
import { useEventStore } from "@/stores/useEventStore";
import MonthEvent from "./MonthEvent.vue";
import WeekDayEvent from "./WeekDayEvent.vue";
import EventDetails from "./EventDetails.vue";
import { Qalendar } from "qalendar";
const eventStore = useEventStore()
</script>

<style>
@import "qalendar/dist/style.css";
</style>
