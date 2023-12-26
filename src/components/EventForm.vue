<template>
  <form class="w-2/3 space-y-6" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="title">
      <FormItem>
        <FormLabel>Machine Name</FormLabel>
        <FormControl>
          <Input type="text" placeholder="maching name" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="operator">
      <FormItem>
        <FormLabel>Operator</FormLabel>
        <FormControl>
          <Input type="text" placeholder="operator" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ value, handleChange }" type="checkbox" name="enabled">
      <FormItem class="flex flex-row items-center bg-red-500 gap-x-3 space-y-0 rounded-md border p-4">
        <FormControl>
          <Checkbox :checked="value" @update:checked="handleChange" class="bg-red-200" />
        </FormControl>
        <div class="space-y-1 leading-none">
          <FormLabel>Do you want to activate this machine?</FormLabel>
          <FormMessage />
        </div>
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="status">
      <FormItem>
        <FormLabel>Status</FormLabel>
        <Select v-bind="componentField">
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select a status" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="normal">
                Normal
              </SelectItem>
              <SelectItem value="warning">
                Warning
              </SelectItem>
              <SelectItem value="danger">
                Danger
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField, value }" name="start">
      <FormItem class="flex flex-col">
        <FormLabel>Start Datetime</FormLabel>
        <Popover>
          <PopoverTrigger as-child>
            <FormControl>
              <Button variant="outline" :class="cn(
                'ps-3 text-start font-normal',
                !value && 'text-muted-foreground',
              )">
                <span>{{ value ? format(value, "yyyy/MM/dd hh:mm") : "Pick a date" }}</span>
                <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent class="p-0">
            <Calendar v-bind="componentField" mode="datetime" />
          </PopoverContent>
        </Popover>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField, value }" name="end">
      <FormItem class="flex flex-col">
        <FormLabel>End Datetime</FormLabel>
        <Popover>
          <PopoverTrigger as-child>
            <FormControl>
              <Button variant="outline" :class="cn(
                'ps-3 text-start font-normal',
                !value && 'text-muted-foreground',
              )">
                <span>{{ value ? format(value, "yyyy/MM/dd hh:mm") : "Pick a date" }}</span>
                <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent class="p-0">
            <Calendar v-bind="componentField" mode="datetime" />
          </PopoverContent>
        </Popover>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit">
      Submit
    </Button>
  </form>
</template>

<script setup lang="ts">
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { computed, h } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/toast/use-toast'
import { useEventStore } from '@/stores/useEventStore'

const eventStore = useEventStore()
const { toast } = useToast()

const currentEvent = computed(() => eventStore.state.events.find((el: DisplayableEvent) => el.id === eventStore.state.editId))

const formSchema = toTypedSchema(z.object({
  title: z.string().min(2).max(50).default(currentEvent.value!.title),
  operator: z.string().min(2).max(50).default(currentEvent.value!.operator || ''),
  enabled: z.boolean().default(currentEvent.value!.enabled),
  status: z.enum(['normal', 'warning', 'danger']).default(currentEvent.value!.status),
  start: z.date().default(new Date(currentEvent.value!.time.start)),
  end: z.date().default(new Date(currentEvent.value!.time.end)),
}).superRefine(({ start, end }, ctx) => {
  if (start > end) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Start date must be before end date',
      path: ['end'],
    })
  }
}))

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})


const onSubmit = handleSubmit((values: {
  title: string
  operator?: string
  enabled: boolean
  status: 'normal' | 'warning' | 'danger'
  start: Date
  end: Date
}) => {
  const payload = {
    ...currentEvent.value,
    ...values,
    time: {
      start: format(values.start, 'yyyy-MM-dd hh:mm'),
      end: format(values.end, 'yyyy-MM-dd hh:mm'),
    },
  }

  eventStore.dispatch({ type: 'update-event', payload })

  toast({
    title: 'You submitted the following values:',
    description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(payload, null, 2))),
  })
})

</script>
