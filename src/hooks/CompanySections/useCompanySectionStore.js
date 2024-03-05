import { useDispatch } from "react-redux";
import sectionsService from "../../api/sectionsService";
import {
  setCompanies,
  setLoading,
} from "../../store/slices/companySectionSlice";

export const useCompanySectionStore = () => {
  const dispatch = useDispatch();

  const startPostCompany = async (company) => {
    try {
      dispatch(setLoading(true));
      const { data } = await sectionsService.post("/companies/post", company);
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
      const { data } = await sectionsService.get("/companies/get");
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
      const { data } = await sectionsService.delete(`/companies/delete/${id}`);
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
