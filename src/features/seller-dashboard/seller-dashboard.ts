// src/services/api.ts
import { API_ENDPOINTS } from "@/api/api-endpoints";
import baseQuery from "@/api/http";
import { createApi } from "@reduxjs/toolkit/query/react";
import { SellerDashboardCalendar, SellerDashboardCounts } from "@/interfaces/seller-dashboard";
import { Item } from "@/interfaces/customer";


export const sellerDashboardApi = createApi({
    reducerPath: "sellerDashboardApi",
    baseQuery,
    endpoints: (builder) => ({
        getItemsDetailsSeller: builder.query<Item, { id: string; queryParams?: string }>({
            query: ({ id, queryParams }) => `${API_ENDPOINTS.SELLER_CUSTOMERS}${id}/?${queryParams}`,
        }),
        getSellerDashborad: builder.query<SellerDashboardCounts, void>({
            query: () => ({
                url: API_ENDPOINTS.SELLER_DASHBOARD,
                method: "GET"
            })
        }),
        getSellerCalendarDate: builder.query<SellerDashboardCalendar, string>({
            query: (value) => ({
                url: API_ENDPOINTS.SELLER_CALENDAR_CLOSE + "?"+value,
                method: "GET"
            })
        })
    }),
});

export const {
    useGetItemsDetailsSellerQuery,
    useGetSellerDashboradQuery,
    useGetSellerCalendarDateQuery,
} = sellerDashboardApi;
