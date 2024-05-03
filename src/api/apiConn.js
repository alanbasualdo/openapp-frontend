import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";

const { VITE_BACKEND } = getEnvVariables();

const apiConn = axios.create({
  baseURL: VITE_BACKEND,
});

apiConn.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    token: localStorage.getItem("token"),
    // 'Content-Type': 'multipart/form-data'
  };

  return config;
});

export default apiConn;
