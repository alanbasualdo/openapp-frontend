import { useDispatch } from "react-redux";
import { setPCsLoading, setProcessors } from "../../store/slices/pcsSectionSlice";
import sectionsService from "../../api/sectionsService";

export const useProcessorsSectionStore = () => {
  const dispatch = useDispatch();

  const startPostProcessor = async (processor) => {
    try {
      dispatch(setPCsLoading(true));
      const { data } = await sectionsService.post(
        "/pcs/post-processor",
        processor
      );
      dispatch(setPCsLoading(false));
      return data;
    } catch (error) {
      dispatch(setPCsLoading(false));
      return { success: false, message: error.response.data.message };
    }
  };

  const startGetProcessors = async () => {
    try {
      dispatch(setPCsLoading(true));
      const { data } = await sectionsService.get("/pcs/get-processors");
      dispatch(setProcessors(data.processors));
      dispatch(setPCsLoading(false));
    } catch (error) {
      dispatch(setPCsLoading(false));
      return { success: false, message: error.response.data.message };
    }
  };

  const startDeleteProcessor = async (id) => {
    try {
      dispatch(setPCsLoading(true));
      const { data } = await sectionsService.delete(
        `/pcs/delete-processor/${id}`
      );
      dispatch(setPCsLoading(false));
      return data;
    } catch (error) {
      dispatch(setPCsLoading(false));
      return { success: false, message: error.response.data.message };
    }
  };

  return {
    startPostProcessor,
    startGetProcessors,
    startDeleteProcessor,
  };
};
