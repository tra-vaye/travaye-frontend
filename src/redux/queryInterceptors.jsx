import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { message } from "antd";

const baseUrl = process.env.REACT_APP_SERVER_URL;
export const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl}`,
  prepareHeaders: (headers) => {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithInterceptor = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  // Check if the response has a status code of 401
  if (result.error?.status === 401 || result.error?.originalStatus === 401) {
    sessionStorage.removeItem("authToken");
    message.error("Session Expired"); 
    window.location.href = "/login";
  }
  if (result.error?.status === 404 || result.error?.originalStatus === 404) {
    // window.location.href = "/*";
    message.error("Page Not Found");
  }
  if (result.error?.status === 503 || result.error?.originalStatus === 503) {
    sessionStorage.removeItem("authToken");
    window.location.href = "/";
    message.error("Server Under Maintenance");
  }

  if (result.error?.status === 500 || result.error?.originalStatus === 500) {
    // sessionStorage.removeItem("authToken");
    // window.location.href = "/serverError";
    message.error("Server Error");
  }
  return result;
};

export const baseQueryForAuth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 503 || result.error?.originalStatus === 503) {
    sessionStorage.removeItem("authToken");
    // window.location.href = "/underMaintenance";
  }

  if (result.error?.status === 500 || result.error?.originalStatus === 500) {
    sessionStorage.removeItem("authToken");
    // window.location.href = "/serverError";
  }
  return result;
};
