<script setup lang="ts">
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
</script>

<template>
  <FormField v-slot="{ componentField }" name="description">
    <FormItem>
      <FormLabel>Note</FormLabel>
      <FormControl>
        <Textarea placeholder="For notes writing" class="resize-none" v-bind="componentField" />
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
