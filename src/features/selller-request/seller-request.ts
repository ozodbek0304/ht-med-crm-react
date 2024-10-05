// src/services/api.ts
import baseQuery from '../../api/http';
import { API_ENDPOINTS } from '../../api/api-endpoints';
import { createApi } from "@reduxjs/toolkit/query/react";
import { SellerRequestsResult, UpdateItem } from "../../interfaces/seller-page";


export const sellerRequestListsApi = createApi({
    reducerPath: "sellerRequestListsApi",
    baseQuery,
    tagTypes: ["seller"],
    endpoints: (builder) => ({
        getSellerRequests: builder.query<SellerRequestsResult, number>({
            query: (page) => `${API_ENDPOINTS.SELLER_REQUESTS_LIST}?page=${page}`,
            providesTags: ["seller"],
        }),
        updateSellerRequest: builder.mutation<UpdateItem, { id: string; status: string, admin_response?: string }>({
            query: ({ id, status, admin_response }) => ({
                url: API_ENDPOINTS.SELLER_REQUEST_UPDATE + `/${id}/`,
                method: "PATCH",
                body: { status: status, admin_response: admin_response },
            }),
            invalidatesTags: ["seller"],
        }),

    }),
});

export const {
    useGetSellerRequestsQuery,
    useUpdateSellerRequestMutation
} = sellerRequestListsApi;
