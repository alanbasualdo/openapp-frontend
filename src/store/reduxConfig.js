import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

export const reduxConfig = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
