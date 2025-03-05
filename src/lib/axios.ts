// /lib/axios.ts
import axios from "axios";

const UNPROTECTED_ENDPOINTS = ["/api/token/", "/api/token/refresh/"];

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Ex: "http://localhost:8000"
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

async function refreshToken() {
  try {
    const response = await api.post("/api/token/refresh/", {}, { withCredentials: true });
    return response.data.access;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error("Unable to refresh token");
  }
}

// Interceptor para atualizar o token automaticamente
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalConfig = error.config;
    if (!UNPROTECTED_ENDPOINTS.includes(originalConfig.url) && error.response) {
      if (error.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const access = await refreshToken();
          api.defaults.headers.Authorization = `Bearer ${access}`;
          originalConfig.headers.Authorization = `Bearer ${access}`;
          return api(originalConfig);
        } catch (refreshError) {
          delete api.defaults.headers.Authorization;
          if (typeof window !== "undefined") {
            window.location.pathname = "/signin";
          }
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
