import { useDispatch } from "react-redux";
import { setModels, setPCsLoading } from "../../store/slices/pcsSectionSlice";
import apiConn from "../../api/apiConn";

export const useModelsSectionStore = () => {
  const dispatch = useDispatch();

  const startPostModel = async (model) => {
    try {
      dispatch(setPCsLoading(true));
      const { data } = await apiConn.post("/pcs/post-model", model);
      dispatch(setPCsLoading(false));
      return data;
    } catch (error) {
      dispatch(setPCsLoading(false));
      return { success: false, message: error.response.data.message };
    }
  };

  const startGetModels = async () => {
    try {
      dispatch(setPCsLoading(true));
      const { data } = await apiConn.get("/pcs/get-models");
      dispatch(setModels(data.models));
      dispatch(setPCsLoading(false));
    } catch (error) {
      dispatch(setPCsLoading(false));
      return { success: false, message: error.response.data.message };
    }
  };

  const startDeleteModel = async (id) => {
    try {
      dispatch(setPCsLoading(true));
      const { data } = await apiConn.delete(`/pcs/delete-model/${id}`);
      dispatch(setPCsLoading(false));
      return data;
    } catch (error) {
      dispatch(setPCsLoading(false));
      return { success: false, message: error.response.data.message };
    }
  };

  return {
    startPostModel,
    startGetModels,
    startDeleteModel,
  };
};
