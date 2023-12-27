export const initState: MaintainState = {
  isOpen: false,
  currentId: 0,
  dob: ['', ''],
  events: [
    {
      id: 1,
      title: 'Machine 4',
      time: { start: "2023-12-27 02:05", end: "2023-12-27 04:35" },
      enabled: true,
      status: 'warning',
      operator: 'John',
      isEditable: true,
      isCustom: true,
    },
    {
      id: 2,
      title: 'Machine 41',
      time: { start: "2023-12-27 03:05", end: "2023-12-27 05:35" },
      enabled: false,
      status: 'danger',
      isEditable: true,
      isCustom: true,
    },
  ],
  config: {
    week: {
      // Takes the value 'sunday' or 'monday'
      // However, if startsOn is set to 'sunday' and nDays to 5, the week displayed will be Monday - Friday
      startsOn: 'monday',
      // Takes the values 5 or 7.
      nDays: 7,
      // Scroll to a certain hour on mounting a week. Takes any value from 0 to 23.
      // This option is not compatible with the 'dayBoundaries'-option, and will simply be ignored if custom day boundaries are set.
      scrollToHour: 5,
    },
    month: {
      // Hide leading and trailing dates in the month view (defaults to true when not set)
      showTrailingAndLeadingDates: false,
    },
    // Takes any valid locale that the browser understands. However, not all locales have been thorougly tested in Qalendar
    // If no locale is set, the preferred browser locale will be used
    // locale: 'zh-TW',
    style: {
      // When adding a custom font, please also set the fallback(s) yourself
      // fontFamily: 'Arial',
    },
    // if not set, the mode defaults to 'week'. The three available options are 'month', 'week' and 'day'
    // Please note, that only day and month modes are available for the calendar in mobile-sized wrappers (~700px wide or less, depending on your root font-size)
    defaultMode: 'day',
    // The silent flag can be added, to disable the development warnings. This will also bring a slight performance boost
    isSilent: true,
    showCurrentTime: true, // Display a line indicating the current time
    eventDialog: {
      isCustom: true,
    },
    dayIntervals: {
      length: 15, // Length in minutes of each interval. Accepts values 15, 30 and 60 (the latter is the default)
      height: 50, // The height of each interval
      displayClickableInterval: true, // Needs to be set explicitly to true, if you want to display clickable intervals
      intervalStyles: { backgroundColor: 'transparent', color: 'transparent' },
    },
  }
}

export function reducer(state: MaintainState, action: any) {
  switch (action.type) {
    case 'update-current-id':
      return {
        ...state,
        currentId: action.payload
      }
    case 'remove-event':
      return {
        ...state,
        events: state.events.filter((event: CalendarMaintain) => event.id !== state.currentId)
      }
    case 'init-current-id':
      return {
        ...state,
        currentId: 0
      }
    case 'open-dialog':
      return {
        ...state,
        isOpen: true
      }
    case 'update-dob':
      return {
        ...state,
        dob: action.payload
      }
    case 'create-event':
      return {
        ...state,
        isOpen: false,
        events: [
          ...state.events,
          {
            id: Math.floor(Math.random() * 1000) + 1,
            ...action.payload.data,
            isEditable: true,
            isCustom: true,
          }
        ]
      }


    case 'update-event':
      return {
        ...state,
        isOpen: false,
        events: state.events.map((event: CalendarMaintain) => {
          if (event.id === action.payload.id) {
            return {
              ...event,
              ...action.payload.data,
              time: {
                ...event.time,
                ...action.payload.data.time
              }
            }
          }
          return event
        })
      }

    default:
      throw new Error('Unexpected action')
  }
}
