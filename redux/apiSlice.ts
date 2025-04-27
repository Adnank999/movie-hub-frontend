import { baseQueryWithReauth } from "@/middleware/baseQueryWithReauth";
import {
    createApi,
    fetchBaseQuery
} from "@reduxjs/toolkit/query/react";


export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Movie'],
    endpoints: () => ({})
});
