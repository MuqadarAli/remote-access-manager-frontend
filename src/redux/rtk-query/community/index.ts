import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl =
  import.meta.env.VITE_ENV === 'development'
    ? import.meta.env.VITE_DEV_URL
    : import.meta.env.VITE_PRO_URL;
//--//
export const communityApi = createApi({
  reducerPath: 'communityApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/community/`,
  }),

  tagTypes: ['community', 'emergency', 'security-guard'],

  endpoints: (builder) => ({
    communityApproval: builder.mutation({
      query: (body) => ({
        url: 'approve-community',
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['community'],
    }),

    communityRegistration: builder.mutation({
      query: (body) => ({
        url: '/register-community/super-admin',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['community'],
    }),

    communityDisable: builder.mutation({
      query: (body) => ({
        url: 'disable-community',
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['community'],
    }),

    getPendingCommunity: builder.query({
      query: () => ({
        url: 'pending-community',
        method: 'GET',
      }),
      providesTags: ['community'],
    }),

    getCommunityType: builder.query({
      query: () => ({
        url: '/community-types',
        method: 'GET',
      }),
      providesTags: ['community'],
    }),

    getApprovedCommunity: builder.query({
      query: () => ({
        url: '/approved-community',
        method: 'GET',
      }),
      providesTags: ['community'],
    }),

    updateCommunityProfile: builder.mutation({
      query: (body) => ({
        url: 'update-community',
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['community'],
    }),

    getEmergencyNumbers: builder.query({
      query: (community_id) => ({
        url: `/emergency-number/${community_id}`,
        method: 'GET',
      }),
      providesTags: ['emergency'],
    }),

    addEmergencyNumber: builder.mutation({
      query: (body) => ({
        url: '/emergency-number',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['emergency'],
    }),

    deleteEmergencyNumber: builder.mutation({
      query: (body) => ({
        url: `/emergency-number`,
        method: 'DELETE',
        body: body,
      }),
      invalidatesTags: ['emergency'],
    }),

    addSecurityGuard: builder.mutation({
      query: (body) => ({
        url: '/security-guard',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['security-guard'],
    }),

    deleteSecurityGuard: builder.mutation({
      query: (body) => ({
        url: `/security-guard`,
        method: 'DELETE',
        body: body,
      }),
      invalidatesTags: ['security-guard'],
    }),

    getSecurityGuard: builder.query({
      query: (community_id) => ({
        url: `/security-guard/${community_id}`,
        method: 'GET',
      }),
      providesTags: ['security-guard'],
    }),
  }),
});

export const {
  useCommunityApprovalMutation,
  useCommunityRegistrationMutation,
  useGetApprovedCommunityQuery,
  useGetPendingCommunityQuery,
  useCommunityDisableMutation,
  useGetCommunityTypeQuery,
  useUpdateCommunityProfileMutation,
  useGetEmergencyNumbersQuery,
  useAddEmergencyNumberMutation,
  useAddSecurityGuardMutation,
  useDeleteSecurityGuardMutation,
  useGetSecurityGuardQuery,
  useDeleteEmergencyNumberMutation
} = communityApi;
