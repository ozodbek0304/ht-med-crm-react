// src/services/api.ts
import { API_ENDPOINTS } from '@/api/api-endpoints';
import baseQuery from '@/api/http';
import { NotificationItem, NotificationsResult } from '@/interfaces/notification';
import { createApi } from '@reduxjs/toolkit/query/react';


export const notificationListApi = createApi({
    reducerPath: 'notificationListApi',
    baseQuery,
    endpoints: (builder) => ({
        getNotificationItems: builder.query<NotificationsResult, string>({
            query: (value) => API_ENDPOINTS.NOTIFICATION_LIST + "?" + value,
        }),

        createItem: builder.mutation<NotificationItem, Partial<NotificationItem>>({
            query: (newItem) => ({
                url: API_ENDPOINTS.DASHBOARD_CARD,
                method: 'POST',
                body: newItem,
            }),
        }),

        updateItem: builder.mutation<NotificationItem, { id: string; changes: Partial<NotificationItem> }>({
            query: ({ id, changes }) => ({
                url: API_ENDPOINTS.DASHBOARD_CARD + '/' + id,
                method: 'PATCH',
                body: changes,
            }),
        }),

        deleteItem: builder.mutation<void, string>({
            query: (id) => ({
                url: API_ENDPOINTS.DASHBOARD_CARD + '/' + id,
                method: 'DELETE',
            }),
        }),

    }),
});

export const {
    useGetNotificationItemsQuery,
    useCreateItemMutation,
    useUpdateItemMutation,
    useDeleteItemMutation,
} = notificationListApi;
