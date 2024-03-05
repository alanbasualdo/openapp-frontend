import { useDispatch } from "react-redux";
import sectionsService from "../../api/sectionsService";
import { setBrands, setLoading } from "../../store/slices/companySectionSlice";

export const useBrandSectionStore = () => {
  const dispatch = useDispatch();

  const startPostBrand = async (brand) => {
    try {
      dispatch(setLoading(true));
      const { data } = await sectionsService.post("/brands/post", brand);
      dispatch(setLoading(false));
      return data;
    } catch (error) {
      dispatch(setLoading(false));
      return { success: false, message: error.response.data.message };
    }
  };

  const startGetBrands = async () => {
    try {
      dispatch(setLoading(true));
      const { data } = await sectionsService.get("/brands/get");
      dispatch(setBrands(data.brands));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      return { success: false, message: error.response.data.message };
    }
  };

  const startDeleteBrand = async (id) => {
    try {
      dispatch(setLoading(true));
      const { data } = await sectionsService.delete(`/brands/delete/${id}`);
      dispatch(setLoading(false));
      return data;
    } catch (error) {
      dispatch(setLoading(false));
      return { success: false, message: error.response.data.message };
    }
  };

  return {
    startPostBrand,
    startGetBrands,
    startDeleteBrand,
  };
};
