import axios from "axios";
import { AuthTokenLocalStorageKey } from "../../auth/constants";

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

axiosImplementation.interceptors.response.use(
  function (config) {
    console.log(config);
    return config;
  },
  function (config) {
    if (config.response.status === 401) {
      window.location.href = "/logout";
    }
    return config.response;
  }
);

export const api = axiosImplementation;
