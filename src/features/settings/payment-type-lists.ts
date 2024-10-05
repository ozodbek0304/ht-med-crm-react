// src/services/api.ts
import baseQuery from '../../api/http';
import { API_ENDPOINTS } from '../../api/api-endpoints';
import { createApi } from '@reduxjs/toolkit/query/react';
import { FilterResult, Item } from './sectors-lists';



export const paymentTypeListsApi = createApi({
    reducerPath: 'paymentTypeListsApi',
    baseQuery,
    tagTypes: ["Payment_Types"],
    endpoints: (builder) => ({

        //  Payment Type List

        getItemsPaymentOrders: builder.query<Item, number>({
            query: (value) => API_ENDPOINTS.PAYMENT_TYPES + `?page=${value}`,
            providesTags: ['Payment_Types'],
        }),


        // Payment Type Create 

        createItemPaymentType: builder.mutation<Item, Partial<FilterResult>>({
            query: (newItem) => ({
                url: API_ENDPOINTS.PAYMENT_TYPES,
                method: 'POST',
                body: newItem,
            }),
            invalidatesTags: ["Payment_Types"]
        }),

        // Payment Type Update 

        updateItemPaymentType: builder.mutation<Item, { id: string; changes: Partial<FilterResult> }>({
            query: ({ id, changes }) => ({
                url: `${API_ENDPOINTS.PAYMENT_TYPES}${id}/`,
                method: 'PATCH',
                body: changes,
            }),
            invalidatesTags: ["Payment_Types"],
        }),

        // Payment Type delete 

        deletePaymentTypeListsItem: builder.mutation<Item, { id: number }>({
            query: ({ id }) => ({
                url: `${API_ENDPOINTS.PAYMENT_TYPES}${id}/`,
                method: 'PATCH',
                body: { status: false }
            }),
            invalidatesTags: ['Payment_Types'],
        }),



    }),
});

export const {
    useGetItemsPaymentOrdersQuery,
    useCreateItemPaymentTypeMutation,
    useUpdateItemPaymentTypeMutation,
    useDeletePaymentTypeListsItemMutation,

} = paymentTypeListsApi;
