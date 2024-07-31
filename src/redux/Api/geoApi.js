import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.REACT_APP_SERVER_URL;
export const GeoApi = createApi({
  reducerPath: "GeoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
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
          value: e?.state,
          label: e?.state,
        }));
        return newList;
      },
    }),
    getCity: builder.query({
      query: (body) => {
        const stateName = body.state ?? undefined; // Checks for stateName in body object
        return {
          url: `states`,
          stateName,
        };
      },
      transformResponse: (res, meta, args) => {
        const stateName = args.state.toLowerCase();
        if (!stateName) {
          return []; // Returns an empty array if stateName is not provided
        }
        const filteredResults = res.filter(
          (item) => item.state.toLowerCase() === stateName
        );
        return filteredResults[0].cities.map((cit) => ({
          value: cit, label: cit
        }));
      },
    }),

    getLandmarks: builder.query({
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
      query: (body) => {
        const stateName = body.state ?? undefined; // Checks for stateName in body object
        return {
          url: `states`,
          stateName,
        };
      },
      transformResponse: (res, meta, args) => {
        const stateName = args.state.toLowerCase();
        if (!stateName) {
          return []; // Returns an empty array if stateName is not provided
        }
        const filteredResults = res.filter(
          (item) => item.state.toLowerCase() === stateName
        );
        return filteredResults[0].lgas.map((cit) => ({
          value: cit, label: cit
        }));
      },
    }),
  }),
});

export const {
  useLazyGetCityQuery,
  useLazyGetLandmarksQuery,
  useLazyGetLgaQuery,
  useGetStatesQuery,
} = GeoApi;
