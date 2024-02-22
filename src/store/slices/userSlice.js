import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    users: [],
    totalUsers: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setTotalUsers: (state, action) => {
      state.totalUsers = action.payload;
    },
    getUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { setUser, setTotalUsers, getUsers } = userSlice.actions;

export default userSlice;
