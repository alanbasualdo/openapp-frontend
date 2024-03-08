import { useDispatch } from "react-redux";
import { setAreas, setLoading } from "../../store/slices/companySectionSlice";
import sectionsService from "../../api/sectionsService";

export const useAreaSectionStore = () => {
  const dispatch = useDispatch();

  const startPostArea = async (area) => {
    try {
      dispatch(setLoading(true));
      const { data } = await sectionsService.post("/areas/post-area", area);
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
      const { data } = await sectionsService.get("/areas/get-areas");
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
      const { data } = await sectionsService.delete(`/areas/delete-area/${id}`);
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
  };
};
