<script setup lang="ts">
import { h } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { format } from 'date-fns'

import { Button } from '@/components/ui/button'
import MainttainFromTitle from './MaintainFormTitle.vue'
import MaintatinFormOperator from './MaintainFormOperator.vue'
import MaintatinFormStatus from './MaintainFormStatus.vue'
import MaintainFormDatePicker from './MaintainFormDatePicker.vue'
import MaintainFormEnabled from './MaintainFormEnabled.vue'
import MaintainFormDescription from './MaintainFormDescription.vue'
import { useMaintainStore } from '@/stores/useMaintainStore'
import { computed } from 'vue'
import { useToast } from '@/components/ui/toast'

const maintainStore = useMaintainStore()
const currentMaintain = computed(() => maintainStore.state.events.find((event: CalendarMaintain) => event.id === maintainStore.state.currentId))
const schema = computed(() => {
  return {
    title: z.string().min(2).max(50),
    operator: z.string().min(2).max(50).optional(),
    status: z.enum(['normal', 'warning', 'danger']),
    dob: z.array(z.date()).length(2),
    enabled: z.boolean(),
    description: z.string().min(2).max(500).optional()

  }
})
const formSchema = computed(() => toTypedSchema(z.object(schema.value)))

const form = useForm({
  validationSchema: formSchema.value,
  initialValues: {
    title: currentMaintain.value?.title,
    operator: currentMaintain.value?.operator,
    status: currentMaintain.value?.status ?? 'normal',
    dob: currentMaintain.value
      ? [currentMaintain.value.time.start, currentMaintain.value.time.end]
      : maintainStore.state.dob,
    enabled: currentMaintain.value?.enabled ?? false,
    description: currentMaintain.value?.description
  }
})

const { toast } = useToast()


const onSubmit = form.handleSubmit((values) => {
  const { dob, ...rest } = values
  const payload = {
    id: maintainStore.state.currentId,
    data: {
      ...rest,
      time: {
        start: format(dob[0], 'yyyy-MM-dd hh:mm'),
        end: format(dob[1], 'yyyy-MM-dd hh:mm')
      }
    }
  }
  console.log('id', payload.id)
  if (payload.id) {
    maintainStore.dispatch({ type: 'update-event', payload })
  } else {
    maintainStore.dispatch({ type: 'create-event', payload })
  }
  console.log('Form submitted!', payload)
  toast({
    title: 'You submitted the following values:',
    description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(payload, null, 2))),
  })
})

</script>

<template>
  <form @submit="onSubmit" class="flex flex-col gap-4">
    <MainttainFromTitle />
    <MaintatinFormOperator />
    <div class="flex gap-4 justify-between">
      <MaintatinFormStatus />
      <MaintainFormDescription />
    </div>
    <MaintainFormDatePicker />
    <MaintainFormEnabled />

    <Button type="submit" class="mt-5" :disabled="!form.values.enabled">Submit</Button>
  </form>
</template>
