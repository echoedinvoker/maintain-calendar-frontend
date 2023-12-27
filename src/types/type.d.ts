declare interface Identifiable {
  id: number
}

declare interface Calendarable {
  color: string
  isEditable: boolean
  isCustom: boolean
  time: { start: string; end: string }
}

declare interface Maintain {
  title: string
  enabled: boolean
  status: 'normal' | 'warning' | 'danger'
  operator: string
  description: string
}

declare interface CalendarMaintain extends Maintain, Calendarable, Identifiable { }

declare interface MaintainState {
  isOpen: boolean
  currentId: number
  dob: [Date, Date]
  events: CalendarEvent[]
  config: any
}

