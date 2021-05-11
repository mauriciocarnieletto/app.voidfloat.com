import axios from "axios";
import { AuthTokenLocalStorageKey } from "../../auth/constants";
import { useAuth } from "../../auth/services/useAuth";

export const configuration = {
  baseURL: process.env.REACT_APP_API_URL,
};

const axiosImplementation = axios.create(configuration);

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

  axiosInstance.interceptors.response.use(function (config) {
    console.log(config);
    return config;
  });

  return axiosInstance;
}
