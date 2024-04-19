import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "../queryInterceptors";

export const LocationApi = createApi({
  reducerPath: "location",
  baseQuery: baseQueryWithInterceptor,
  refetchOnReconnect: true,
  refetchOnUpdateTimeout: 50000,
  tagTypes: ["Locations", "Location", "Trip", "LikedLocation", "User"],
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
        `locations?page=${page}&count=${count}`,
      providesTags: ["Locations"],
      refetchOnUpdate: true,
      refetchOnReconnect: true,
    }),
    getLocationById: builder.query({
      query: ({ id }) => ({
        url: `locations/${id}`,
      }),
      providesTags: ["Location"],
    }),
    planATrip: builder.query({
      query: ({ state, city, category, lga, budget, subcategory }) =>
        `locations/plan?state=${state}&category=${category}&subcategory=${subcategory}&city=${city}&lga=${lga}&budget=${budget}`,
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
          sub: e?.sub?.map((e) => ({
            value: e.slug,
            label: e.name,
          })),
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
      invalidatesTags: ["Location", "User"],
    }),
    reviewLocation: builder.mutation({
      query: (body) => ({
        url: "location/review",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Location"],
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
  useReviewLocationMutation,
} = LocationApi;
