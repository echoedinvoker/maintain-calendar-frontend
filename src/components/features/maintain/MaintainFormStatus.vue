<script setup lang="ts">
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
</script>

<template>
  <FormField v-slot="{ componentField }" type="radio" name="status">
    <FormItem class="space-y-3">
      <FormLabel>Maching status...</FormLabel>

      <FormControl>
        <RadioGroup class="flex flex-col space-y-1" v-bind="componentField">
          <FormItem class="flex items-center space-y-0 gap-x-3">
            <FormControl>
              <RadioGroupItem value="normal" />
            </FormControl>
            <FormLabel class="font-normal">
              Normal
            </FormLabel>
          </FormItem>
          <FormItem class="flex items-center space-y-0 gap-x-3">
            <FormControl>
              <RadioGroupItem value="warning" />
            </FormControl>
            <FormLabel class="font-normal">
              Warning
            </FormLabel>
          </FormItem>
          <FormItem class="flex items-center space-y-0 gap-x-3">
            <FormControl>
              <RadioGroupItem value="danger" />
            </FormControl>
            <FormLabel class="font-normal">
              Danger
            </FormLabel>
          </FormItem>
        </RadioGroup>
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
