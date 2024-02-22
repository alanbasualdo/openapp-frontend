import { useDispatch } from "react-redux";
import { setLoading } from "../store/slices/loaderSlice";
import userService from "../api/userService";
import { getUsers, setTotalUsers } from "../store/slices/userSlice";

export const useUserStore = () => {
  const dispatch = useDispatch();

  const startCreateUser = async (userData) => {
    try {
      dispatch(setLoading(true));
      const { data } = await userService.post("/user/post", userData);
      dispatch(setLoading(false));
      return data;
    } catch (error) {
      dispatch(setLoading(false));
      return { success: false, message: error.response.data.message };
    }
  };

  const startGetUsers = async () => {
    try {
      dispatch(setLoading(true));
      const { data } = await userService.get("/user/");
      dispatch(getUsers(data.users));
      dispatch(setTotalUsers(data.total));
      dispatch(setLoading(false));
      return data;
    } catch (error) {
      dispatch(setLoading(false));
      return { success: false, message: error.response.data.message };
    }
  };

  return {
    startCreateUser,
    startGetUsers,
  };
};
