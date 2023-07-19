import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryForAuth } from "../queryInterceptors";

export const AuthApi = createApi({
  reducerPath: "auth",
  baseQuery: baseQueryForAuth,

  refetchOnReconnect: true,
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    userLogin: builder.mutation({
      query: (body) => ({
        url: "api/user/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Profile"],
    }),
    businessLogin: builder.mutation({
      query: (body) => ({
        url: "api/business/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Profile"],
    }),
    register: builder.mutation({
      query: (body) => ({
        url: "api/auth/register",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Profile"],
    }),
    getMe: builder.query({
      query: (id) => `user/${id}`,
      providesTags: ["Profile"],
    }),
  }),
});

export const {
  useGetMeQuery,
  useUserLoginMutation,
  useBusinessLoginMutation,
  useRegisterMutation,
} = AuthApi;
