<template>
  <DialogContent class="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Edit</DialogTitle>
      <DialogDescription>
        Make changes to your profile here. Click save when you're done.
      </DialogDescription>
    </DialogHeader>
    <EventForm />
  </DialogContent>
</template>

<script setup lang="ts">
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import EventForm from './EventForm.vue'

defineProps<{
  event: DisplayableEvent
}>()

</script>
