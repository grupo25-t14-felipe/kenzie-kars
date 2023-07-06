import axios from "axios";

const api = axios.create({
  // baseURL: "https://kenzie-kars-api.onrender.com",/
  baseURL: "http://localhost:3001",
  // timeout: 20000
});

export default api;
