import { createSlice } from "@reduxjs/toolkit";

export const ticketsSlice = createSlice({
  name: "tickets",
  initialState: {
    tickets: [],
    ticketsLoading: false,
  },
  reducers: {
    setTickets: (state, action) => {
      state.tickets = action.payload;
    },
    setTicketsLoading: (state, action) => {
      state.ticketsLoading = action.payload;
    },
  },
});

export const { setTickets, setTicketsLoading } = ticketsSlice.actions;

export default ticketsSlice;
