// src/services/api.ts

import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from '../../api/http';
import { API_ENDPOINTS } from '../../api/api-endpoints';
import { adminDashboard } from '../../interfaces/admin-dashborad';



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
