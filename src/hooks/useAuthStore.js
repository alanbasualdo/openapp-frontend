import { useDispatch } from "react-redux";
import { setAuthLoading, setLogin, setLogout } from "../store/slices/authSlice";
import userService from "../api/userService";
import Swal from "sweetalert2";

export const useAuthStore = () => {
  const dispatch = useDispatch();

  const startLogin = async ({ userName, password }) => {
    try {
      dispatch(setAuthLoading(true));
      const { data } = await userService.post("/auth/login", {
        userName,
        password,
      });
      dispatch(setAuthLoading(false));
      if (data.success) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: data.message,
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            title: "my-swal-title-class",
          },
        });
        localStorage.setItem("token", data.token);
        localStorage.setItem("token-init-date", new Date().getTime());
        dispatch(setLogin(data.user));
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: data.message,
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            title: "my-swal-title-class",
          },
        });
      }
    } catch (error) {
      dispatch(setAuthLoading(false));
      console.log(error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: error.response.data.message,
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          title: "my-swal-title-class",
        },
      });
    }
  };

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return dispatch(setLogout());
      const { data } = await userService.get("/auth/renew");
      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("token-init-date", new Date().getTime());
      } else {
        dispatch(setLogout(data));
      }
    } catch (error) {
      localStorage.clear();
      dispatch(setLogout());
    }
  };

  return {
    startLogin,
    checkAuth,
  };
};
