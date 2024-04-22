import { useDispatch } from "react-redux";
import { setRam, setPCsLoading } from "../../store/slices/pcsSectionSlice";
import sectionsService from "../../api/sectionsService";

export const useRamSectionStore = () => {
  const dispatch = useDispatch();

  const startPostMemorie = async (memorie) => {
    try {
      dispatch(setPCsLoading(true));
      const { data } = await sectionsService.post("/pcs/post-ram", memorie);
      dispatch(setPCsLoading(false));
      return data;
    } catch (error) {
      dispatch(setPCsLoading(false));
      return { success: false, message: error.response.data.message };
    }
  };

  const startGetMemories = async () => {
    try {
      dispatch(setPCsLoading(true));
      const { data } = await sectionsService.get("/pcs/get-rams");
      dispatch(setRam(data.processors));
      dispatch(setPCsLoading(false));
    } catch (error) {
      dispatch(setPCsLoading(false));
      return { success: false, message: error.response.data.message };
    }
  };

  const startDeleteMemorie = async (id) => {
    try {
      dispatch(setPCsLoading(true));
      const { data } = await sectionsService.delete(`/pcs/delete-ram/${id}`);
      dispatch(setPCsLoading(false));
      return data;
    } catch (error) {
      dispatch(setPCsLoading(false));
      return { success: false, message: error.response.data.message };
    }
  };

  return {
    startPostMemorie,
    startGetMemories,
    startDeleteMemorie,
  };
};
