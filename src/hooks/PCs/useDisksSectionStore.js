import { useDispatch } from "react-redux";
import { setPCsLoading, setDisks } from "../../store/slices/pcsSectionSlice";
import sectionsService from "../../api/sectionsService";

export const useDisksSectionStore = () => {
  const dispatch = useDispatch();

  const startPostDisk = async (processor) => {
    try {
      dispatch(setPCsLoading(true));
      const { data } = await sectionsService.post("/pcs/post-disk", processor);
      dispatch(setPCsLoading(false));
      return data;
    } catch (error) {
      dispatch(setPCsLoading(false));
      return { success: false, message: error.response.data.message };
    }
  };

  const startGetDisks = async () => {
    try {
      dispatch(setPCsLoading(true));
      const { data } = await sectionsService.get("/pcs/get-disks");
      dispatch(setDisks(data.disks));
      dispatch(setPCsLoading(false));
    } catch (error) {
      dispatch(setPCsLoading(false));
      return { success: false, message: error.response.data.message };
    }
  };

  const startDeleteDisk = async (id) => {
    try {
      dispatch(setPCsLoading(true));
      const { data } = await sectionsService.delete(`/pcs/delete-disk/${id}`);
      dispatch(setPCsLoading(false));
      return data;
    } catch (error) {
      dispatch(setPCsLoading(false));
      return { success: false, message: error.response.data.message };
    }
  };

  return {
    startPostDisk,
    startGetDisks,
    startDeleteDisk,
  };
};
