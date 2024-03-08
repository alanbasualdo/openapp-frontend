import { useDispatch } from "react-redux";
import {
  setLoading,
  setPositions,
} from "../../store/slices/companySectionSlice";
import sectionsService from "../../api/sectionsService";

export const usePositionSectionStore = () => {
  const dispatch = useDispatch();

  const startPostPosition = async (position) => {
    try {
      dispatch(setLoading(true));
      const { data } = await sectionsService.post(
        "/positions/post-position",
        position
      );
      dispatch(setLoading(false));
      return data;
    } catch (error) {
      dispatch(setLoading(false));
      return { success: false, message: error.response.data.message };
    }
  };

  const startGetPositions = async () => {
    try {
      dispatch(setLoading(true));
      const { data } = await sectionsService.get("/positions/get-positions");
      dispatch(setPositions(data.positions));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      return { success: false, message: error.response.data.message };
    }
  };

  const startDeletePosition = async (id) => {
    try {
      dispatch(setLoading(true));
      const { data } = await sectionsService.delete(
        `/positions/delete-position/${id}`
      );
      dispatch(setLoading(false));
      return data;
    } catch (error) {
      dispatch(setLoading(false));
      return { success: false, message: error.response.data.message };
    }
  };

  return {
    startPostPosition,
    startGetPositions,
    startDeletePosition,
  };
};
