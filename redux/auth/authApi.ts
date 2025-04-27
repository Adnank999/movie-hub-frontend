
import { apiSlice } from '../apiSlice'; 

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      
    }),
    register: builder.mutation({
      query: (newUserData) => ({
        url: '/auth/register',
        method: 'POST',
        body: newUserData,
      }),
    }),
    refreshToken: builder.mutation({
      query: () => ({
        url: '/auth/refresh-token',
        method: 'POST',
     
      }),
    }),
  }),
  overrideExisting: false, 
});

export const { useLoginMutation, useRegisterMutation,useRefreshTokenMutation } = authApi;
