import axios from 'axios';

const getAll = () => {
  const req = axios.get('/api/entries');

  return req.then(res => res.data);
};

const create = (payload) => {
  const req = axios.post('/api/entries', payload);

  return req.then(res => res.data);
};

const deleteEntry = (id) => {
  return axios.delete(`/api/entries/${id}`);
};

const update = (id, payload) => {
  const req = axios.put(`/api/entries/${id}`, payload);

  return req.then(res => res.data);
};

export default { getAll, create, deleteEntry, update };