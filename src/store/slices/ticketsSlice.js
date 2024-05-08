import { createSlice } from "@reduxjs/toolkit";

export const ticketsSlice = createSlice({
  name: "tickets",
  initialState: {
    tickets: [],
    ticketsLoading: false,
    area: localStorage.getItem("area") || "",
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
      localStorage.setItem("area", action.payload); // Guardar el valor en localStorage al establecer el área
    },
  },
});

export const { setTickets, setTicketsLoading, setArea } = ticketsSlice.actions;

export default ticketsSlice;
