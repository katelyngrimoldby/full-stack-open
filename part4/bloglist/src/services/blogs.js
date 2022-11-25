import axios from 'axios';
const baseUrl = '/api/blogs';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const addNew = async (payload, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` }
  };

  const response = await axios.post(baseUrl, payload, config);
  return response.data;
};

export default { getAll, addNew };