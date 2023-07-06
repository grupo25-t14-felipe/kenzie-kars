import axios from "axios";

const api = axios.create({
  baseURL: "https://kenzie-kars-api.onrender.com",
  timeout: 20000
});

export default api;
