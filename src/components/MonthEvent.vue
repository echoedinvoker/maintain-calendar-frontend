<template>
  <Badge :class="Color[event.id % 4]" @click="handleClick">{{ event.title }}</Badge>
</template>

<script setup lang="ts">
import { Badge } from "@/components/ui/badge";
import { useEventStore } from "@/stores/useEventStore";
import { Color } from "@/types/colors";

const props = defineProps<{
  event: DisplayableEvent;
}>();

const eventStore = useEventStore()

function handleClick() {
  eventStore.dispatch({ type: 'update-edit-id', payload: props.event.id })
}
</script>
