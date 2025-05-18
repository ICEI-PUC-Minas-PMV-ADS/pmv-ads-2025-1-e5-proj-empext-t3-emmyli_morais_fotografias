import axios from "axios";

 const url = 'http://localhost:3000'
 //const url = 'https://emmylifotografias.com.br/api'

export const api = axios.create ({baseURL: url});

// interceptor global
api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});