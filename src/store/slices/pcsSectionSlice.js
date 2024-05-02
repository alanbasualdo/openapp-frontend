import { createSlice } from "@reduxjs/toolkit";

export const pcsSectionSlice = createSlice({
  name: "pcsSection",
  initialState: {
    processors: [],
    rams: [],
    disks: [],
    models: [],
    computers: [],
    pcsLoading: false,
  },
  reducers: {
    setProcessors: (state, action) => {
      state.processors = action.payload;
    },
    setRams: (state, action) => {
      state.rams = action.payload;
    },
    setDisks: (state, action) => {
      state.disks = action.payload;
    },
    setModels: (state, action) => {
      state.models = action.payload;
    },
    setComputers: (state, action) => {
      state.computers = action.payload;
    },
    setPCsLoading: (state, action) => {
      state.pcsLoading = action.payload;
    },
  },
});

export const {
  setProcessors,
  setRams,
  setDisks,
  setModels,
  setComputers,
  setPCsLoading,
} = pcsSectionSlice.actions;

export default pcsSectionSlice;
