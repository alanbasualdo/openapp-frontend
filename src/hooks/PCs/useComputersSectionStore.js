import { useDispatch } from "react-redux";
import apiConn from "../../api/apiConn";
import {
  setPCsLoading,
  setComputers,
} from "../../store/slices/pcsSectionSlice";

export const useComputersSectionStore = () => {
  const dispatch = useDispatch();

  const startPostComputer = async (computer) => {
    try {
      dispatch(setPCsLoading(true));
      const { data } = await apiConn.post(
        "/pcs/post-computer",
        computer
      );
      dispatch(setPCsLoading(false));
      return data;
    } catch (error) {
      dispatch(setPCsLoading(false));
      return { success: false, message: error.response.data.message };
    }
  };

  const startGetComputers = async () => {
    try {
      dispatch(setPCsLoading(true));
      const { data } = await apiConn.get("/pcs/get-computers");
      dispatch(setComputers(data.pcs));
      dispatch(setPCsLoading(false));
    } catch (error) {
      dispatch(setPCsLoading(false));
      return { success: false, message: error.response.data.message };
    }
  };

  const startDeleteComputer = async (id) => {
    try {
      dispatch(setPCsLoading(true));
      const { data } = await apiConn.delete(
        `/pcs/delete-computer/${id}`
      );
      dispatch(setPCsLoading(false));
      return data;
    } catch (error) {
      dispatch(setPCsLoading(false));
      return { success: false, message: error.response.data.message };
    }
  };

  return {
    startPostComputer,
    startGetComputers,
    startDeleteComputer,
  };
};
