import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const GeoApi = createApi({
  reducerPath: "GeoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://nigeria-states-towns-lga.onrender.com/api/",
  }),
  refetchOnReconnect: true,
  refetchOnUpdateTimeout: 50000,
  tagTypes: ["states"],
  endpoints: (builder) => ({
    getStates: builder.query({
      query: () => ({
        url: "states",
      }),
      transformResponse: (res) => {
        const newList = res?.map((e) => ({
          value: e?.state_code,
          label: e?.name,
        }));
        return newList;
      },
    }),
    getCity: builder.query({
      query: (body) => ({
        url: `${body?.state}/towns`,
      }),
      transformResponse: (res) => {
        const result = res.map((e) => ({
          value: e.name,
          label: e.name,
        }));
        return result;
      },
    }),
    getLga: builder.query({
      query: (body) => ({
        url: `${body?.state}/lgas`,
      }),
      transformResponse: (res) => {
        const result = res.map((e) => ({
          value: e.name,
          label: e.name,
        }));
        return result;
      },
    }),
  }),
});

export const { useLazyGetCityQuery, useLazyGetLgaQuery, useGetStatesQuery } =
  GeoApi;
