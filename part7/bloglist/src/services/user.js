import axios from "axios";
const baseUrl = "/api/users";

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addNew = async (payload) => {
  const response = await axios.post(baseUrl, payload)
  return response.data
}

export default {getAll, addNew}