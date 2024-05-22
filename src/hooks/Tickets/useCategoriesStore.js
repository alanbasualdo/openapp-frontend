import { useDispatch } from "react-redux";
import apiConn from "../../api/apiConn";
import {
  setCategories,
  setLoadingCategories,
  setTickets,
} from "../../store/slices/ticketsSlice";

export const useCategoriesStore = () => {
  const dispatch = useDispatch();

  const startPostCategory = async (category) => {
    try {
      dispatch(setLoadingCategories(true));
      const { data } = await apiConn.post(
        "/categories/post-category",
        category
      );
      dispatch(setLoadingCategories(false));
      return data;
    } catch (error) {
      dispatch(setLoadingCategories(false));
      return { success: false, message: error.response.data.message };
    }
  };

  const startGetCategories = async () => {
    try {
      dispatch(setLoadingCategories(true));
      const { data } = await apiConn.get("/categories/get-categories");
      dispatch(setCategories(data.categories));
      dispatch(setLoadingCategories(false));
    } catch (error) {
      dispatch(setLoadingCategories(false));
      return { success: false, message: error.response.data.message };
    }
  };

  const startGetCategoriesByArea = async (areaID) => {
    try {
      dispatch(setLoadingCategories(true));
      const { data } = await apiConn.get(
        `/categories/get-categories/${areaID}`
      );
      dispatch(setCategories(data.categories));
      dispatch(setLoadingCategories(false));
      return data;
    } catch (error) {
      dispatch(setLoadingCategories(false));
      return { success: false, message: error.response.data.message };
    }
  };

  const startPutCategory = async (categoryID) => {
    try {
      dispatch(setLoadingCategories(true));
      const { data } = await apiConn.put(
        `/tickets/put-observers/${categoryID}`
      );
      dispatch(setLoadingCategories(false));
      return data;
    } catch (error) {
      dispatch(setLoadingCategories(false));
      return { success: false, message: error.response.data.message };
    }
  };

  const startDeleteCategory = async (id) => {
    try {
      dispatch(setLoadingCategories(true));
      const { data } = await apiConn.delete(
        `/categories/delete-category/${id}`
      );
      dispatch(setLoadingCategories(false));
      return data;
    } catch (error) {
      dispatch(setLoadingCategories(false));
      return { success: false, message: error.response.data.message };
    }
  };

  return {
    startPostCategory,
    startGetCategories,
    startGetCategoriesByArea,
    startPutCategory,
    startDeleteCategory,
  };
};
