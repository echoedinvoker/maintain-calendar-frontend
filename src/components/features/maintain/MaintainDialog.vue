<template>
  <DialogContent class="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>{{ maintainStore.state.currentId ? 'Edit' : 'Create' }}</DialogTitle>
      <DialogDescription>
        Make changes to your profile here. Click save when you're done.
      </DialogDescription>
    </DialogHeader>
    <MaintainForm />
  </DialogContent>
</template>

<script setup lang="ts">
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import MaintainForm from './MaintainForm.vue'
import { useMaintainStore } from '@/stores/useMaintainStore';

const maintainStore = useMaintainStore()

defineProps<{
  event: CalendarMaintain
}>()

</script>
