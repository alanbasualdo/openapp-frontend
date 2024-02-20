import { useDispatch, useSelector } from "react-redux";
import userService from "../api/userService";
import { setLoading } from "../store/slices/loaderSlice";

export const useUserStore = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const startCreateUser = async (userData) => {
    try {
      dispatch(setLoading(true));
      const data = await userService.post("/user/create", userData);
      console.log(data);
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    startCreateUser,
  };
};
