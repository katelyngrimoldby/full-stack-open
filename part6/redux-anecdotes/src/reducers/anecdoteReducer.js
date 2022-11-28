import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdoteService'

const anecdotesAtStart = []

const initialState = anecdotesAtStart

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },

    voteOnAnecdote(state, action) {
      return state.map(anecdote => {
        return anecdote.id !== action.payload.id ? anecdote : action.payload
      })
    },

    populateAnecdotes(state, action) {
      return action.payload
    }
  }
})
export const { createAnecdote, voteOnAnecdote, populateAnecdotes } = anecdoteSlice.actions

export const initAnecdotes = payload => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(populateAnecdotes(anecdotes))
  }
}

export const addAnecdote = payload => {
  return async dispatch => {
    const anecdote = await anecdoteService.addNew(payload)
    dispatch(createAnecdote(anecdote))
  }
}

export const updateAnecdote = (payload) => {
  return async dispatch => {
    const anecdote = await anecdoteService.update(payload)
    dispatch(voteOnAnecdote(anecdote))
  }
}

export default anecdoteSlice.reducer