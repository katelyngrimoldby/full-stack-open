import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addNew = async (payload) => {
  const response = await axios.post(baseUrl, {
    content: payload,
    id: getId(),
    votes: 0
  })
  return response.data
}

const update = async (payload) => {
  const anecdote = {
    content: payload.content,
    id: payload.id,
    votes: payload.votes + 1
  }
  const response = await axios.put(`${baseUrl}/${payload.id}`, anecdote)
  return response.data
}

const anecdoteService = { getAll, addNew, update }

export default anecdoteService