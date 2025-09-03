// src/api.js
import axios from "axios";

// default to same-origin "/api" (works in dev with Vite proxy and in prod)
const baseURL =
  (import.meta.env.VITE_API_URL && import.meta.env.VITE_API_URL.trim()) || "/api";

const api = axios.create({
  baseURL,
  withCredentials: false,   // keep false unless you switch to cookie auth
  timeout: 30000,
});

// attach JWT if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// optional: global 401 handler → kick to /login
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      if (!location.pathname.startsWith("/login") && !location.pathname.startsWith("/signup")) {
        window.location.assign("/login");
      }
    }
    return Promise.reject(err);
  }
);

export default api;
