<script setup lang="ts">
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'

</script>

<template>
  <FormField v-slot="{ value, handleChange }" name="enabled">
    <FormItem class="flex flex-row items-center justify-between rounded-lg border p-4">
      <div class="space-y-0.5">
        <FormLabel class="text-base">
          Enable maintain mode
        </FormLabel>
        <FormDescription>
          Confirm to enable maintain mode
        </FormDescription>
      </div>
      <FormControl>
        <Switch :checked="value" @update:checked="handleChange" />
      </FormControl>
    </FormItem>
  </FormField>
</template>
