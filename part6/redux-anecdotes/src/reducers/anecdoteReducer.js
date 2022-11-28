import { createSlice } from "@reduxjs/toolkit"

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
      const id = action.payload
      const anecdote = state.find(anecdote => anecdote.id === id)
      const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1}
      
      return state.map(anecdote => {
        return anecdote.id !== id ? anecdote : updatedAnecdote
      })
    },

    populateAnecdotes(state, action) {
      return action.payload
    }
  }
})
export const { createAnecdote, voteOnAnecdote, populateAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer