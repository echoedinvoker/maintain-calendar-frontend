<script setup lang="ts">
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
</script>
<template>
  <FormField v-slot="{ componentField }" name="title">
    <FormItem>
      <FormLabel>Machine name</FormLabel>
      <FormControl>
        <Input type="text" placeholder="machin name" v-bind="componentField" />
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
