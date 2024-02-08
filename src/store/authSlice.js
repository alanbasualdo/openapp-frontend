import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "checking",
    user: null,
  },
  reducers: {
    onChecking: (state) => {
      state.status = "checking";
      state.user = null;
      state.errorMessage = undefined;
    },
    onLogin: (state, { payload }) => {
      state.status = "auth";
      state.user = payload.user;
    },
    onLogout: (state) => {
      state.status = "not-auth";
      state.user = null;
    },
  },
});

export const { onChecking, onLogin, onLogout } = authSlice.actions;

export default authSlice;
