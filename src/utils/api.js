import axios from "axios";

const api = axios.create({
  baseURL: "https://aff-prog-backend.onrender.com/api", // your Express backend
});

export default api;