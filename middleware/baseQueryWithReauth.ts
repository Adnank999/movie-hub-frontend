
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError, RootState } from "@reduxjs/toolkit/query";
import Cookies from "js-cookie"; 


const baseUrl = process.env.NEXT_PUBLIC_MOVIE_HOST;


const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: "include", 
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
   
    }
    return headers;
  },

});


export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result?.error?.status === 401) {
    // console.warn("Access token expired. Trying to refresh...");
    const token = localStorage.getItem("authToken");
    if (!token ) return result;
   
    const refreshResult: any = await baseQuery(
      {
        url: "/auth/refresh-token",
        method: "POST",
      },
      api,
      extraOptions
    );

   
    if (refreshResult?.data?.accessToken) {
      
      localStorage.setItem("authToken", refreshResult.data.accessToken);

      
      result = await baseQuery(args, api, extraOptions);
    } else {
      // console.error("Failed to refresh token. Logging out.");
      localStorage.removeItem("authToken");
      Cookies.remove("refreshToken"); 
    }
  }

  return result;
};
