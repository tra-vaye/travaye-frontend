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
      query: ({ page, count, categories, locationCity }) => ({
        url: `locations`,
        params: { page, count },
      }),
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
      query: () => `locations?filters=wildlife-attractions&location=lagos`,
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
          value: e.slug.replace('&', '%26') || e.name.replace('&', '%26'),
          label: e.name,
          sub: e?.sub?.map((e) => ({
            value: e.slug.replace('&', '%26'),
            label: e.name,
          })),
        }));
        return result;
      },
    }),
    addLocationToLikedLocations: builder.mutation({
      query: (body) => ({
        url: "locations/like",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Location", "User"],
    }),
    unlikeLocation: builder.mutation({
      query: (body) => ({
        url: "locations/unlike",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Location", "User"],
    }),
    reviewLocation: builder.mutation({
      query: (body) => ({
        url: "locations/review",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Location"],
    }),
    getStates: builder.query({
      query: () => ({
        url: "states",
      }),
      // transformResponse: (apiResponse) => {
      //   const res = Object.entries(apiResponse).map(([key, value]) => ({
      //     value: key,
      //     label: key,
      //     states: value,
      //   }));
      //   return res;
      // },
    }),
    getBudgets: builder.query({
      query: () => ({
        url: 'budgets'
      })
    })
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
  useUnlikeLocationMutation,
  useGetPlanATripQuery,
  useReviewLocationMutation,
  useGetStatesQuery,
  useGetBudgetsQuery,
} = LocationApi;
