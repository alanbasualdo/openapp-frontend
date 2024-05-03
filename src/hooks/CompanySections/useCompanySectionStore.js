import { useDispatch } from "react-redux";
import apiConn from "../../api/apiConn";
import {
  setCompanies,
  setLoading,
} from "../../store/slices/companySectionSlice";

export const useCompanySectionStore = () => {
  const dispatch = useDispatch();

  const startPostCompany = async (company) => {
    try {
      dispatch(setLoading(true));
      const { data } = await apiConn.post(
        "/companies/post-company",
        company
      );
      dispatch(setLoading(false));
      return data;
    } catch (error) {
      dispatch(setLoading(false));
      return { success: false, message: error.response.data.message };
    }
  };

  const startGetCompanies = async () => {
    try {
      dispatch(setLoading(true));
      const { data } = await apiConn.get("/companies/get-companies");
      dispatch(setCompanies(data.companies));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      return { success: false, message: error.response.data.message };
    }
  };

  const startDeleteCompany = async (id) => {
    try {
      dispatch(setLoading(true));
      const { data } = await apiConn.delete(
        `/companies/delete-company/${id}`
      );
      dispatch(setLoading(false));
      return data;
    } catch (error) {
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
