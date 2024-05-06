import { useDispatch, useSelector } from "react-redux";
import { setAreas, setLoading } from "../../store/slices/companySectionSlice";
import apiConn from "../../api/apiConn";

export const useAreaSectionStore = () => {
  const dispatch = useDispatch();
  const { areas } = useSelector((state) => state.companySection);

  const startPostArea = async (area) => {
    try {
      dispatch(setLoading(true));
      const { data } = await apiConn.post("/areas/post-area", area);
      dispatch(setLoading(false));
      return data;
    } catch (error) {
      dispatch(setLoading(false));
      return { success: false, message: error.response.data.message };
    }
  };

  const startGetAreas = async () => {
    try {
      dispatch(setLoading(true));
      const { data } = await apiConn.get("/areas/get-areas");
      dispatch(setAreas(data.areas));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      return { success: false, message: error.response.data.message };
    }
  };

  const startDeleteArea = async (id) => {
    try {
      dispatch(setLoading(true));
      const { data } = await apiConn.delete(`/areas/delete-area/${id}`);
      dispatch(setLoading(false));
      return data;
    } catch (error) {
      dispatch(setLoading(false));
      return { success: false, message: error.response.data.message };
    }
  };

  return {
    startPostArea,
    startGetAreas,
    startDeleteArea,
    areas,
  };
};
