import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "../queryInterceptors";

export const PaymentApi = createApi({
  reducerPath: "payment",
  baseQuery: baseQueryWithInterceptor,
  refetchOnReconnect: true,
  refetchOnUpdateTimeout: 50000,
  tagTypes: ["Payment"],
  endpoints: (builder) => ({
    verifyPayment: builder.mutation({
      query: (paymentData) => ({
        url: "pay/verify",
        method: "POST",
        body: paymentData,
      }),
      invalidatesTags: ["Payment"],
    }),
  }),
});

export const { useVerifyPaymentMutation } = PaymentApi;
