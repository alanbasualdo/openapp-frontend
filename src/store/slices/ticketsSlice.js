import { createSlice } from "@reduxjs/toolkit";

export const ticketsSlice = createSlice({
  name: "tickets",
  initialState: {
    tickets: [],
    ticketsLoading: false,
    area: localStorage.getItem("area") || "",
    loadingCategories: false,
    categories: [],
  },
  reducers: {
    setTickets: (state, action) => {
      state.tickets = action.payload;
    },
    setTicketsLoading: (state, action) => {
      state.ticketsLoading = action.payload;
    },
    setArea: (state, action) => {
      state.area = action.payload;
      localStorage.setItem("area", action.payload);
    },
    setLoadingCategories: (state, action) => {
      state.loadingCategories = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const {
  setTickets,
  setTicketsLoading,
  setArea,
  setLoadingCategories,
  setCategories,
} = ticketsSlice.actions;

export default ticketsSlice;
