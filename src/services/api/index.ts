import axios from "axios";
import { useAuth } from "../../auth/services/useAuth";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export function useApi() {
  const { isAuth, token } = useAuth();

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  axiosInstance.interceptors.request.use(function (config) {
    if (isAuth) config.headers.Authorization = token;
    return config;
  });

  return axiosInstance;
}
