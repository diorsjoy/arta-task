import { notification } from "antd";
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response && error.response.status === 401) {
      notification.error({
        message: "Authentication Error",
        description: "Please log in again.",
      });
    } else {
      notification.error({
        message: "API Error",
        description: error.message,
      });
    }
    return Promise.reject(error);
  }
);
