import { useDispatch } from "react-redux";
import sectionsService from "../../api/sectionsService";
import { setCities, setLoading } from "../../store/slices/companySectionSlice";

export const useCitySectionStore = () => {
  const dispatch = useDispatch();

  const startPostCity = async (city) => {
    try {
      dispatch(setLoading(true));
      const { data } = await sectionsService.post("/cities/post", city);
      dispatch(setLoading(false));
      return data;
    } catch (error) {
      dispatch(setLoading(false));
      return { success: false, message: error.response.data.message };
    }
  };

  const startGetCities = async () => {
    try {
      dispatch(setLoading(true));
      const { data } = await sectionsService.get("/cities/get");
      dispatch(setCities(data.cities));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      return { success: false, message: error.response.data.message };
    }
  };

  const startDeleteCity = async (id) => {
    try {
      dispatch(setLoading(true));
      const { data } = await sectionsService.delete(`/cities/delete/${id}`);
      dispatch(setLoading(false));
      return data;
    } catch (error) {
      dispatch(setLoading(false));
      return { success: false, message: error.response.data.message };
    }
  };

  return {
    startPostCity,
    startGetCities,
    startDeleteCity,
  };
};
