import { useDispatch } from "react-redux";
import {
  setSubareas,
  setLoading,
} from "../../store/slices/companySectionSlice";
import apiConn from "../../api/apiConn";

export const useSubareaSectionStore = () => {
  const dispatch = useDispatch();

  const startPostSubarea = async (subarea) => {
    try {
      dispatch(setLoading(true));
      const { data } = await apiConn.post(
        "/subareas/post-subarea",
        subarea
      );
      dispatch(setLoading(false));
      return data;
    } catch (error) {
      dispatch(setLoading(false));
      return { success: false, message: error.response.data.message };
    }
  };

  const startGetSubareas = async () => {
    try {
      dispatch(setLoading(true));
      const { data } = await apiConn.get("/subareas/get-subareas");
      dispatch(setSubareas(data.subareas));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      return { success: false, message: error.response.data.message };
    }
  };

  const startDeleteSubarea = async (id) => {
    try {
      dispatch(setLoading(true));
      const { data } = await apiConn.delete(
        `/subareas/delete-subarea/${id}`
      );
      dispatch(setLoading(false));
      return data;
    } catch (error) {
      dispatch(setLoading(false));
      return { success: false, message: error.response.data.message };
    }
  };

  return {
    startPostSubarea,
    startGetSubareas,
    startDeleteSubarea,
  };
};
