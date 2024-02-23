import { useDispatch } from "react-redux";
import { setAuthLoading, setLogin, setLogout } from "../store/slices/authSlice";
import userService from "../api/userService";
import Swal from "sweetalert2";
import { setLoading } from "../store/slices/loaderSlice";

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

  const startLogout = () => {
    dispatch(setLoading(true));
    try {
      localStorage.clear();
      dispatch(setLogout());
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
      dispatch(setLoading(false));
    }
  };

  const checkAuth = async () => {
    dispatch(setLoading(true));
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(setLogout());
      return dispatch(setLoading(false));
    }
    try {
      const { data } = await userService.get("/auth/renew");
      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("token-init-date", new Date().getTime());
        dispatch(setLogin(data.user));
      } else {
        dispatch(setLogout(data));
      }
    } catch (error) {
      console.error("Error renewing token:", error);
      localStorage.clear();
      dispatch(setLogout());
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    startLogin,
    startLogout,
    checkAuth,
  };
};
