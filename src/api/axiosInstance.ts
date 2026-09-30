import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  // The user service authenticates with an HttpOnly access_token cookie
  // (see services/userService/API.md), so cookies have to be sent along
  // with every request.
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
