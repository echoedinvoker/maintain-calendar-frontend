import { initState, reducer } from '@/reducers/eventReducer'
import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Action {
  type: string
  payload?: any
}

export const useMaintainStore = defineStore('maintain', () => {
  const state = ref(initState)
  function dispatch(action: Action) { state.value = reducer(state.value, action) }



  return {
    state,
    dispatch,
  }
})
