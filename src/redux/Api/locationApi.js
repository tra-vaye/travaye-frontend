import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "../queryInterceptors";

export const LocationApi = createApi({
  reducerPath: "location",
  baseQuery: baseQueryWithInterceptor,
  refetchOnReconnect: true,
  refetchOnUpdateTimeout: 50000,
  tagTypes: ["Locations", "Location", "Trip"],
  endpoints: (builder) => ({
    createLocation: builder.mutation({
      query: (body) => ({
        url: "location",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Locations"],
    }),
    getLocations: builder.query({
      query: ({ page, count, categories, locationCity }) =>
        `location?page=${page}&count=${count}&filters=${encodeURIComponent(
          categories
        )}&location=${encodeURIComponent(locationCity)}`,
      providesTags: ["Locations"],
      refetchOnUpdate: true,
      refetchOnReconnect: true,
    }),
    planATrip: builder.query({
      query: ({ state, city, category, lga, budget }) =>
        `location/plan?state=${state}&category=${category}&city=${city}&lga=${lga}&budget=${budget}`,
      providesTags: ["Trip"],
    }),

    filterLocation: builder.query({
      query: () => `location?filters=wildlife-attractions&location=lagos`,
      providesTags: ["Location"],
      refetchOnUpdate: true,
      refetchOnReconnect: true,
    }),
  }),
});

export const {
  useCreateLocationMutation,
  useGetLocationsQuery,
  useGetLocationQuery,
  useFilterLocationQuery,
  usePlanATripQuery,
} = LocationApi;
