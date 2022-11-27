import { createSlice } from "@reduxjs/toolkit"

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
export default notificationSlice.reducer