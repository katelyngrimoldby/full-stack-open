import { createSlice } from "@reduxjs/toolkit";

const initialState = null;
let timeoutId

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage(state, action) {
      return action.payload;
    },

    clearMessage(state, action) {
      return null;
    },
  },
});

export const { setMessage, clearMessage } = messageSlice.actions;

export const triggerMessage = (message, interval) => {
  return async dispatch => {
    clearTimeout(timeoutId)
    dispatch(setMessage(message))
    timeoutId = setTimeout(() => dispatch(clearMessage()), (interval * 1000))
  }
}

export default messageSlice.reducer;
