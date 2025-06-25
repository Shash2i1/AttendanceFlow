import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/v1"
    : "/api/v1",
  withCredentials: true, // use cookies if needed
});

export default api;
