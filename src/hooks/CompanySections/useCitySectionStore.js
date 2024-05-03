import { useDispatch } from "react-redux";
import apiConn from "../../api/apiConn";
import { setCities, setLoading } from "../../store/slices/companySectionSlice";

export const useCitySectionStore = () => {
  const dispatch = useDispatch();

  const startPostCity = async (city) => {
    try {
      dispatch(setLoading(true));
      const { data } = await apiConn.post("/cities/post-city", city);
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
      const { data } = await apiConn.get("/cities/get-cities");
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
      const { data } = await apiConn.delete(
        `/cities/delete-city/${id}`
      );
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
