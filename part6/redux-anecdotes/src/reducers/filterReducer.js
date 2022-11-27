import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    changeFilter(state, action) {
      return state = action.payload
    }
  }
})
export const { changeFilter } = filterSlice.actions
export default filterSlice.reducer