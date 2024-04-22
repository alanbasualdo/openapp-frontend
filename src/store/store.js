import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import userSlice from "./slices/userSlice";
import loaderSlice from "./slices/loaderSlice";
import companySectionSlice from "./slices/companySectionSlice";
import pcsSectionSlice from "./slices/pcsSectionSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    user: userSlice.reducer,
    loader: loaderSlice.reducer,
    companySection: companySectionSlice.reducer,
    pcsSection: pcsSectionSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
