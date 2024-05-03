import { useDispatch } from "react-redux";
import apiConn from "../../api/apiConn";
import { setBrands, setLoading } from "../../store/slices/companySectionSlice";

export const useBrandSectionStore = () => {
  const dispatch = useDispatch();

  const startPostBrand = async (brand) => {
    try {
      dispatch(setLoading(true));
      const { data } = await apiConn.post("/brands/post-brand", brand);
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
      const { data } = await apiConn.get("/brands/get-brands");
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
      const { data } = await apiConn.delete(
        `/brands/delete-brand/${id}`
      );
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
