import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "../queryInterceptors";

export const LocationApi = createApi({
  reducerPath: "location",
  baseQuery: baseQueryWithInterceptor,
  refetchOnReconnect: true,
  refetchOnUpdateTimeout: 50000,
  tagTypes: ["Locations", "Location", "Trip", "LikedLocation"],
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
    getLocationById: builder.query({
      query: ({ id }) => ({
        url: `location/${id}`,
      }),
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
    getCategories: builder.query({
      query: () => ({
        url: "categories",
      }),
      transformResponse: (res) => {
        const result = res.map((e) => ({
          value: e.name,
          label: e.name,
          sub: e.sub,
        }));
        return result;
      },
    }),
    addLocationToLikedLocations: builder.mutation({
      query: (body) => ({
        url: "location/like",
        method: "POST",
        body,
      }),
      invalidatesTags: ["LikedLocation"],
    }),
  }),
});

export const {
  useCreateLocationMutation,
  useGetLocationsQuery,
  useGetLocationByIdQuery,
  useFilterLocationQuery,
  useLazyPlanATripQuery,
  useGetCategoriesQuery,
  useAddLocationToLikedLocationsMutation,
  useGetPlanATripQuery,
} = LocationApi;
