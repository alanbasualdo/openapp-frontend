import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    totalUsers: null,
    userLoading: false,
  },
  reducers: {
    setTotalUsers: (state, action) => {
      state.totalUsers = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setUserLoading: (state, action) => {
      state.userLoading = action.payload;
    },
  },
});

export const { setTotalUsers, setUsers, setUserLoading } = userSlice.actions;

export default userSlice;
