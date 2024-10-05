import { createApi } from "@reduxjs/toolkit/query/react";
import { SellerResults } from "../../interfaces/seller-page";
import { API_ENDPOINTS } from "../../api/api-endpoints";
import baseQuery from "../../api/http";




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