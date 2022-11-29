import { createSlice } from "@reduxjs/toolkit";
import login from '../services/login';
import { triggerMessage } from './messageReducer';

const initialState = null

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action) {
      window.localStorage.setItem('User', JSON.stringify(action.payload));
      return action.payload;
    },

    clearAuth(state, action) {
      window.localStorage.removeItem('User');
      return null;
    }
  }
})

export const {setAuth, clearAuth} = authSlice.actions

export const getAuth = (payload) => {
  return async dispatch => {
    try {
      const userData = await login(payload);
      dispatch(setAuth(userData));
    } catch (error) {
      dispatch(triggerMessage({ type: 'error', message: error.response.data.error }, 5));
    }
  }
}

export default authSlice.reducer