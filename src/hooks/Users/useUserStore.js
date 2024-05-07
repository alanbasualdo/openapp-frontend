import { useDispatch } from "react-redux";
import apiConn from "../../api/apiConn";
import {
  setUsers,
  setTotalUsers,
  setUserLoading,
} from "../../store/slices/userSlice";

export const useUserStore = () => {
  const dispatch = useDispatch();

  const startCreateUser = async (userData) => {
    try {
      dispatch(setUserLoading(true));
      const { data } = await apiConn.post("/user/post", userData);
      dispatch(setUserLoading(false));
      return data;
    } catch (error) {
      dispatch(setUserLoading(false));
      return { success: false, message: error.response.data.message };
    }
  };

  const startGetUsers = async () => {
    try {
      dispatch(setUserLoading(true));
      const { data } = await apiConn.get("/user/");
      dispatch(setUsers(data.users));
      dispatch(setTotalUsers(data.total));
      dispatch(setUserLoading(false));
      return data;
    } catch (error) {
      dispatch(setUserLoading(false));
      return { success: false, message: error.response.data.message };
    }
  };

  return {
    startCreateUser,
    startGetUsers,
  };
};