// src/services/api.ts
import { API_ENDPOINTS } from '@/api/api-endpoints';
import baseQuery from '@/api/http';
import { adminDashboard } from '@/interfaces/admin-dashborad';
import { createApi } from '@reduxjs/toolkit/query/react';



export const dashboardCardApi = createApi({
    reducerPath: 'DashboardCard',
    baseQuery,
    endpoints: (builder) => ({
        getItemsSellerDashboard: builder.query<adminDashboard, void>({
            query: () => API_ENDPOINTS.ADMIN_DASHBOARD,
        }),

    }),
});

export const {
    useGetItemsSellerDashboardQuery,
} = dashboardCardApi;
