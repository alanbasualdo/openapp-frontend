import { createSlice } from "@reduxjs/toolkit";

export const pcsSectionSlice = createSlice({
  name: "pcsSection",
  initialState: {
    processors: [],
    ram: [],
    disks: [],
    types: [],
    pcs: [],
    pcsLoading: false,
  },
  reducers: {
    setProcessors: (state, action) => {
      state.processors = action.payload;
    },
    setRam: (state, action) => {
      state.ram = action.payload;
    },
    setDisks: (state, action) => {
      state.disks = action.payload;
    },
    setTypes: (state, action) => {
      state.types = action.payload;
    },
    setPCs: (state, action) => {
      state.pcs = action.payload;
    },
    setPCsLoading: (state, action) => {
      state.pcsLoading = action.payload;
    },
  },
});

export const {
  setProcessors,
  setRam,
  setDisks,
  setTypes,
  setPCs,
  setPCsLoading,
} = pcsSectionSlice.actions;

export default pcsSectionSlice;
