import { createSlice } from "@reduxjs/toolkit";

export const companySectionSlice = createSlice({
  name: "companySection",
  initialState: {
    companies: [],
    brands: [],
    cities: [],
    branches: [],
    areas: [],
    subareas: [],
    positions: [],
    loading: false,
  },
  reducers: {
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
    setBrands: (state, action) => {
      state.brands = action.payload;
    },
    setCities: (state, action) => {
      state.cities = action.payload;
    },
    setBranches: (state, action) => {
      state.branches = action.payload;
    },
    setAreas: (state, action) => {
      state.areas = action.payload;
    },
    setSubareas: (state, action) => {
      state.subareas = action.payload;
    },
    setPositions: (state, action) => {
      state.positions = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setCompanies,
  setBrands,
  setCities,
  setBranches,
  setAreas,
  setSubareas,
  setPositions,
  setLoading,
} = companySectionSlice.actions;

export default companySectionSlice;
