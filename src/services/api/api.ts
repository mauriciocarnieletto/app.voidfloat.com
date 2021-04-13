import axios from "axios";
import { AuthTokenLocalStorageKey } from "../../auth/constants";
import { useAuth } from "../../auth/services/useAuth";

const axiosImplementation = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

axiosImplementation.interceptors.request.use(function (config) {
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    AuthTokenLocalStorageKey
  )}`;
  return config;
});

export const api = axiosImplementation;

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
