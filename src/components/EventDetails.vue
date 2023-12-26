<template>
  <Dialog>
    <div v-if="event" class="px-4 py-2">
      <div class="flex justify-between items-center mb-2">
        <DialogTrigger as-child>
          <mdicon name="PencilBoxOutline" role="button" @click="close" />
        </DialogTrigger>
        <mdicon name="close" role="button" @click="close" />
      </div>
      <div v-for="(value, key) in event" class="text-lg">{{ key }}: {{ value }}</div>
    </div>
    <EventDialog :event="event" />
  </Dialog>
</template>

<script setup lang="ts">
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import EventDialog from './EventDialog.vue';

defineProps<{
  event: DisplayableEvent
  close: () => void
}>()

</script>
