<template>
  <Dialog v-model:open="maintainStore.state.isOpen">
    <div v-if="event" class="px-4 py-2">
      <div class="flex justify-between items-center mb-2">
        <div class="flex justify-start">
          <DialogTrigger as-child class="mr-1">
            <mdicon name="PencilBoxOutline" role="button" @click="close" />
          </DialogTrigger>
          <AlertDialog>
            <AlertDialogTrigger>
              <mdicon name="TrashCanOutline" role="button" />
            </AlertDialogTrigger>
            <MaintainRemover />
          </AlertDialog>
        </div>
        <mdicon name="close" role="button" @click="close" />
      </div>
      <div v-for="(value, key) in event" class="text-lg">{{ key }}: {{ value }}</div>
    </div>
    <MaintainDialog :event="event" />
  </Dialog>
</template>

<script setup lang="ts">
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import MaintainDialog from './MaintainDialog.vue';
import MaintainRemover from './MaintainRemover.vue';
import { useMaintainStore } from '@/stores/useMaintainStore';

const maintainStore = useMaintainStore()

defineProps<{
  event: CalendarMaintain
  close: () => void
}>()

</script>
