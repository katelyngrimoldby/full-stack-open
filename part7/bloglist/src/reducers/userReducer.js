import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/user";

const initialState = []

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action) {
      return action.payload
    },

    appendUser(state, action) {
      state.push(action.payload)
    }
  }
})

export const {setUsers, appendUsers} = userSlice.actions

export const getUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch(setUsers(users))
  }
}

export default userSlice.reducer