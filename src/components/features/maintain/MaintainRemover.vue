<script setup lang="ts">
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useMaintainStore } from '@/stores/useMaintainStore';

const maintainStore = useMaintainStore()

function handleDelete() {
  maintainStore.dispatch({ type: 'remove-event' })

}
</script>

<template>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction @click="handleDelete">Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</template>
