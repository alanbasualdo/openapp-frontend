import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import sectionsService from "../api/sectionsService";
import { setCompanies, setLoading } from "../store/slices/companySectionSlice";

export const useCompanySectionStore = () => {
  const dispatch = useDispatch();

  const startPostCompany = async (company) => {
    try {
      dispatch(setLoading(true));
      const { data } = await sectionsService.post("/companies/post", company);
      dispatch(setLoading(false));
      if (data.success) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: data.message,
          showConfirmButton: false,
          timer: 1000,
          customClass: {
            title: "my-swal-title-class",
          },
        });
        startGetCompanies();
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: data.message,
          showConfirmButton: false,
          timer: 1000,
          customClass: {
            title: "my-swal-title-class",
          },
        });
      }
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: error.response.data.message,
        showConfirmButton: false,
        timer: 1000,
        customClass: {
          title: "my-swal-title-class",
        },
      });
    }
  };

  const startGetCompanies = async () => {
    try {
      dispatch(setLoading(true));
      const { data } = await sectionsService.get("/companies/get");
      dispatch(setCompanies(data.companies));
      dispatch(setLoading(false));
      return data;
    } catch (error) {
      dispatch(setLoading(false));
      return { success: false, message: error.response.data.message };
    }
  };

  const startDeleteCompany = async (id) => {
    try {
      dispatch(setLoading(true));
      const { data } = await sectionsService.delete(`/companies/delete/${id}`);
      if (data.success) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: data.message,
          showConfirmButton: false,
          timer: 1000,
          customClass: {
            title: "my-swal-title-class",
          },
        });
      }
      startGetCompanies();
      dispatch(setLoading(false));
      return data;
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: error.response.data.message,
        showConfirmButton: false,
        timer: 1000,
        customClass: {
          title: "my-swal-title-class",
        },
      });
      dispatch(setLoading(false));
      return { success: false, message: error.response.data.message };
    }
  };

  return {
    startPostCompany,
    startGetCompanies,
    startDeleteCompany,
  };
};
