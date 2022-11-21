import axios from 'axios'

const getAll = () => {
  const req = axios.get("http://localhost:3000/entries")

  return req.then(res => res.data)
}

const create = (payload) => {
  const req = axios.post("http://localhost:3000/entries", payload)

  return req.then(res => res.data)
}

export default { getAll, create }