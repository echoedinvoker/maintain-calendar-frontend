<template>
  <Badge :class="Color[event.id % 4]" @click="handleClick">{{ event.title }}</Badge>
</template>

<script setup lang="ts">
import { Badge } from "@/components/ui/badge";
import { useMaintainStore } from "@/stores/useMaintainStore";
import { Color } from "@/types/colors";

const props = defineProps<{
  event: CalendarMaintain;
}>();

const maintainStore = useMaintainStore()

function handleClick() {
  maintainStore.dispatch({ type: 'update-edit-id', payload: props.event.id })
}
</script>
