import axios from 'axios';
const baseUrl = '/api/login';

const login = async (username, password) => {
  const body = {
    username,
    password
  };

  const response = await axios.post(baseUrl, body);
  return response.data;
};

export default login;