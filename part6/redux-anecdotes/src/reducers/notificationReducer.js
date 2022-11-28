import { createSlice } from "@reduxjs/toolkit"

let timeoutId

const initialState = ''

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotification(state, action) {
      return state = action.payload
    },

    clearNotification(state, action) {
      return state = ''
    }
  }
})
export const { setNotification, clearNotification } = notificationSlice.actions

export const triggerNotification = (message, interval) => {
  return async dispatch => {
    clearTimeout(timeoutId)
    dispatch(setNotification(message))
    timeoutId = setTimeout(() => dispatch(clearNotification()), (interval * 1000))
  }
}

export default notificationSlice.reducer