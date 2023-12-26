
declare interface Event {
  id: number
  title: string
  time: { start: string; end: string }
  enabled: boolean
  status: 'normal' | 'warning' | 'danger'
  operator?: string
  description?: string
}


declare interface DisplayableEvent extends Event {
  color: string
  isEditable: boolean
  isCustom: boolean
}

declare interface EventState {
  editId: number
  events: DisplayableEvent[]
  config: any
}

