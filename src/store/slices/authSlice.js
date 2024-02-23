import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    authStatus: "not-auth",
    user: null,
    authLoading: false,
  },
  reducers: {
    setLogin: (state, { payload }) => {
      state.authStatus = "auth";
      state.user = payload.user;
    },
    setLogout: (state) => {
      state.authStatus = "not-auth";
      state.user = null;
    },
    setAuthLoading: (state, action) => {
      state.authLoading = action.payload;
    },
  },
});

export const { setLogin, setLogout, setAuthLoading } = authSlice.actions;

export default authSlice;
