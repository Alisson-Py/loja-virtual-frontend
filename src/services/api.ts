import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:3333/v1',
  baseURL: process.env.REACT_APP_URL
});

export default api;