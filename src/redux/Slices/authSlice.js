import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  timeout: false,
  loading: false,
  error: null,
  idleTimeOut: 10000000,
  lastActionTimestamp: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    timeout: (state) => {
      state.timeout = true;
      state.token = null;
      state.user = null;
      sessionStorage.removeItem("newtoken");
      sessionStorage.removeItem("profileId");
      state.error = "Token expired or idle timeout expired.";
    },
    resetTimeout: (state) => {
      state.error = null;
    },
    refreshToken: (state, action) => {
      // Simulating token refresh, replace with your own logic
      const { newToken } = action.payload;
      state.token = newToken;
      state.lastActionTimestamp = Date.now();
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      sessionStorage.removeItem("newtoken");
      sessionStorage.removeItem("profileId");
    },
  },
});
export const {
  timeout,
  updateIdleTimeOut,
  resetTimeout,
  refreshToken,
  logout,
} = authSlice.actions;
export default authSlice.reducer;
