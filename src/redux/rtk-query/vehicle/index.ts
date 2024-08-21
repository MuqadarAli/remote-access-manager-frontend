import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const baseUrl =
//   process.env.ENV === 'development' ? process.env.DEV_URL : process.env.PRO_URL;
const baseUrl = 'https://api.homeaccessmanager.com';
export const vehicleApi = createApi({
  reducerPath: 'vehicleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/vehicle/`,
  }),

  tagTypes: ['vehicle'],

  endpoints: (builder) => ({
    vehicleApprovalByAdmin: builder.mutation({
      query: (body) => ({
        url: 'approval',
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['vehicle'],
    }),

    vehicleDisableByAdmin: builder.mutation({
      query: (body) => ({
        url: 'disable',
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['vehicle'],
    }),

    getPendingVehiclesForCommunity: builder.query({
      query: (community_id) => ({
        url: `pending/${community_id}`,
        method: 'GET',
      }),
      providesTags: ['vehicle'],
    }),

    getApprovedVehiclesForCommunity: builder.query({
      query: (community_id) => ({
        url: `approved/${community_id}`,
        method: 'GET',
      }),
      providesTags: ['vehicle'],
    }),
  }),
});

export const {
  useGetApprovedVehiclesForCommunityQuery,
  useGetPendingVehiclesForCommunityQuery,
  useVehicleApprovalByAdminMutation,
  useVehicleDisableByAdminMutation,
} = vehicleApi;