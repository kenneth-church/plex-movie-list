import axios from 'axios';
const baseURL = `${window.location.origin}/api`;

const api = axios.create({ baseURL });

export { baseURL, api };
