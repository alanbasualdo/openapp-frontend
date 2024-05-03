import { useDispatch } from "react-redux";
import apiConn from "../../api/apiConn";
import {
  setBranches,
  setLoading,
} from "../../store/slices/companySectionSlice";

export const useBranchSectionStore = () => {
  const dispatch = useDispatch();

  const startPostBrach = async (branch) => {
    try {
      dispatch(setLoading(true));
      const { data } = await apiConn.post(
        "/branches/post-branch",
        branch
      );
      dispatch(setLoading(false));
      return data;
    } catch (error) {
      dispatch(setLoading(false));
      return { success: false, message: error.response.data.message };
    }
  };

  const startGetBranches = async () => {
    try {
      dispatch(setLoading(true));
      const { data } = await apiConn.get("/branches/get-branches");
      dispatch(setBranches(data.branches));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      return { success: false, message: error.response.data.message };
    }
  };

  const startDeleteBranch = async (id) => {
    try {
      dispatch(setLoading(true));
      const { data } = await apiConn.delete(
        `/branches/delete-branch/${id}`
      );
      dispatch(setLoading(false));
      return data;
    } catch (error) {
      dispatch(setLoading(false));
      return { success: false, message: error.response.data.message };
    }
  };

  return {
    startPostBrach,
    startGetBranches,
    startDeleteBranch,
  };
};
