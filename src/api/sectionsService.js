import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";

const { VITE_SECTIONS_SERVICE_URL } = getEnvVariables();

const sectionsService = axios.create({
  baseURL: VITE_SECTIONS_SERVICE_URL,
});

sectionsService.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    token: localStorage.getItem("token"),
    // 'Content-Type': 'multipart/form-data'
  };

  return config;
});

export default sectionsService;
