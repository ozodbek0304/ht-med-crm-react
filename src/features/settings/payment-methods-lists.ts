// src/services/api.ts
import { API_ENDPOINTS } from '@/api/api-endpoints';
import baseQuery from '@/api/http';
import { createApi } from '@reduxjs/toolkit/query/react';
import { FilterResult, Item } from './sectors-lists';




export const paymentMethodsListsApi = createApi({
    reducerPath: 'paymentMethodsListsApi',
    baseQuery,
    tagTypes: ["Payment_Methods"],
    endpoints: (builder) => ({

        //  Payment Orders List

        getItemsPayment: builder.query<Item, number>({
            query: (value) => API_ENDPOINTS.PAYMENT_METHODS + `?page=${value}`,
            providesTags: ['Payment_Methods'],
        }),

        // Payment Orders Create

        createItemPaymentMethod: builder.mutation<Item, Partial<FilterResult>>({
            query: (newItem) => ({
                url: API_ENDPOINTS.PAYMENT_METHODS,
                method: 'POST',
                body: newItem,
            }),
            invalidatesTags: ["Payment_Methods"]
        }),


        // Payment Order Update

        updateItemPaymentMethod: builder.mutation<Item, { id: string; changes: Partial<FilterResult> }>({
            query: ({ id, changes }) => ({
                url: `${API_ENDPOINTS.PAYMENT_METHODS}${id}/`,
                method: 'PATCH',
                body: changes,
            }),
            invalidatesTags: ["Payment_Methods"],
        }),

        // Payment Order delete 

        deletePaymentOrderListsItem: builder.mutation<Item, { id: number }>({
            query: ({ id }) => ({
                url: `${API_ENDPOINTS.PAYMENT_METHODS}${id}/`,
                method: 'PATCH',
                body: { status: false }
            }),
            invalidatesTags: ['Payment_Methods'],
        }),


    }),
});

export const {
    useCreateItemPaymentMethodMutation,
    useUpdateItemPaymentMethodMutation,
    useDeletePaymentOrderListsItemMutation,
    useGetItemsPaymentQuery,

} = paymentMethodsListsApi;
