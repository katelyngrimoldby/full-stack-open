import axios from 'axios'

const getAll = () => {
  const req = axios.get("http://localhost:3000/api/entries")

  return req.then(res => res.data)
}

const create = (payload) => {
  const req = axios.post("http://localhost:3000/api/entries", payload)

  return req.then(res => res.data)
}

const deleteEntry = (id) => {
  return axios.delete(`http://localhost:3000/api/entries/${id}`)
  
}

const update = (id, payload) => {
  const req = axios.put(`http://localhost:3000/api/entries/${id}`, payload)

  return req.then(res => res.data)
}

export default { getAll, create, deleteEntry, update }