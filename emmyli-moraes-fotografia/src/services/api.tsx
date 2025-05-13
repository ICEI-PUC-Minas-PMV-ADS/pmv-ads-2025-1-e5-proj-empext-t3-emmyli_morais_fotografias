import axios from "axios";

// const url = 'http://localhost:3000'
const url = 'https://emmylifotografias.com.br'

export const api = axios.create ({baseURL: url});