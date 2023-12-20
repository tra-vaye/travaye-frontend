import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "../queryInterceptors";

export const PaymentApi = createApi({
  reducerPath: "payment",
  baseQuery: baseQueryWithInterceptor,
  refetchOnReconnect: true,
  refetchOnUpdateTimeout: 50000,
  tagTypes: ["Payment"],
  endpoints: (builder) => ({
    verifyTrialPayment: builder.mutation({
      query: (paymentData) => ({
        url: "pay/verifyTrial",
        method: "POST",
        body: paymentData,
      }),
      invalidatesTags: ["Payment"],
    }),
    refundTrialPayment: builder.mutation({
      query: (paymentData) => ({
        url: "pay/refundTrial",
        method: "POST",
        body: paymentData,
      }),
      invalidatesTags: ["Payment"],
    }),
  }),
});

export const { useVerifyTrialPaymentMutation, useRefundTrialPaymentMutation } =
  PaymentApi;
