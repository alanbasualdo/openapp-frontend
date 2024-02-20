import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";
import tokenInterceptor from "../helpers/tokenInterceptor";

const { USER_SERVICE_URL } = getEnvVariables();

const userService = axios.create({
  baseURL: USER_SERVICE_URL,
});

console.log(USER_SERVICE_URL);

tokenInterceptor();

export default userService;
