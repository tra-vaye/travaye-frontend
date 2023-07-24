import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryForAuth } from "../queryInterceptors";

export const AuthApi = createApi({
  reducerPath: "profile",
  baseQuery: baseQueryForAuth,

  refetchOnReconnect: true,
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    userLogin: builder.mutation({
      query: (body) => ({
        url: "user/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Profile"],
    }),
    businessLogin: builder.mutation({
      query: (body) => ({
        url: "business/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Profile"],
    }),
    userRegister: builder.mutation({
      query: (body) => ({
        url: "user",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Profile"],
    }),
    businessRegister: builder.mutation({
      query: (body) => ({
        url: "business",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Profile"],
    }),
    codeVerify: builder.mutation({
      query: (body) => ({
        url: "user/verify",
        method: "POST",
        body,
      }),
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
  useUserRegisterMutation,
  useBusinessRegisterMutation,
  useCodeVerifyMutation,
} = AuthApi;
