import axios from 'axios';
const baseUrl = 'http://localhost:3001/notes';

const getAll = () => {
  return axios.get(baseUrl).then(response => response.data);
};

const create = newObject => {
  return axios.post(baseUrl, newObject).then(response => response.data);
};

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject).then(response => {
    return response.data;
  }).catch(error => {
    console.log('failed to update notes');
  });
};

export default {
  getAll,
  create,
  update,
};