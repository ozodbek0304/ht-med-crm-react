import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "@/api/http";
import { API_ENDPOINTS } from "@/api/api-endpoints";
import { SellerResults } from "@/interfaces/seller-page";



export const profileApi = createApi({
    reducerPath: "profileApi",
    baseQuery,
    tagTypes: ["Profile"],
    endpoints: (builder) => ({
        getItemsProfile: builder.query<SellerResults, void>({
            query: () => API_ENDPOINTS.PROFILE,
            providesTags: ["Profile"],
        }),
    })
})

export const { useGetItemsProfileQuery, useLazyGetItemsProfileQuery } = profileApi;