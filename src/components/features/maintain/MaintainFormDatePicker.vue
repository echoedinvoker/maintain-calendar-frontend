<script setup lang="ts">
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

</script>

<template>
  <FormField v-slot="{ componentField }" name="dob">
    <FormItem class="flex flex-col">
      <FormLabel>Maintain period</FormLabel>
      <FormControl>
        <VueDatePicker v-bind="componentField" range />
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
