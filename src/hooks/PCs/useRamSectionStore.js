import { useDispatch } from "react-redux";
import { setRams, setPCsLoading } from "../../store/slices/pcsSectionSlice";
import apiConn from "../../api/apiConn";

export const useRamSectionStore = () => {
  const dispatch = useDispatch();

  const startPostRam = async (memorie) => {
    try {
      dispatch(setPCsLoading(true));
      const { data } = await apiConn.post("/pcs/post-ram", memorie);
      dispatch(setPCsLoading(false));
      return data;
    } catch (error) {
      dispatch(setPCsLoading(false));
      return { success: false, message: error.response.data.message };
    }
  };

  const startGetRams = async () => {
    try {
      dispatch(setPCsLoading(true));
      const { data } = await apiConn.get("/pcs/get-rams");
      dispatch(setRams(data.rams));
      dispatch(setPCsLoading(false));
    } catch (error) {
      dispatch(setPCsLoading(false));
      return { success: false, message: error.response.data.message };
    }
  };

  const startDeleteRam = async (id) => {
    try {
      dispatch(setPCsLoading(true));
      const { data } = await apiConn.delete(`/pcs/delete-ram/${id}`);
      dispatch(setPCsLoading(false));
      return data;
    } catch (error) {
      dispatch(setPCsLoading(false));
      return { success: false, message: error.response.data.message };
    }
  };

  return {
    startPostRam,
    startGetRams,
    startDeleteRam,
  };
};
