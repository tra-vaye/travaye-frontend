import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { AuthApi } from "./Api/authApi";
import authReducer from "./Slices/authSlice";
import { LocationApi } from "./Api/locationApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
    [LocationApi.reducerPath]: LocationApi.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([AuthApi.middleware, LocationApi.middleware]),
});

setupListeners(store.dispatch);
