import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";
import tokenInterceptor from "../helpers/tokenInterceptor";

const { VITE_USER_SERVICE_URL } = getEnvVariables();

const userService = axios.create({
  baseURL: VITE_USER_SERVICE_URL,
});

tokenInterceptor();

export default userService;
