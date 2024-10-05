// src/services/api.ts
import baseQuery from '../../api/http';
import { API_ENDPOINTS } from '../../api/api-endpoints';
import { createApi } from '@reduxjs/toolkit/query/react';
import { FilterResult, Item } from './sectors-lists';




export const SourseListsApi = createApi({
    reducerPath: 'SourseListsApi',
    baseQuery,
    tagTypes: ["Customer"],
    endpoints: (builder) => ({


        //  Customer Sourse List
        getItemsCustomer: builder.query<Item, number>({
            query: (value) => API_ENDPOINTS.CUSTOMER_SOURSE + `?page=${value}`,
            providesTags: ['Customer']
        }),

        //  Customer Source Create 
        createItemSource: builder.mutation<Item, Partial<FormData>>({
            query: (newItem) => ({
                url: API_ENDPOINTS.CUSTOMER_SOURSE,
                method: 'POST',
                body: newItem,
            }),
            invalidatesTags: ["Customer"]
        }),

        // Customer Sourse Updates
        updateItemSourse: builder.mutation<Item, { id: string; formData: FormData }>({
            query: ({ id, formData }) => ({
                url: `${API_ENDPOINTS.CUSTOMER_SOURSE}${id}/`,
                method: 'PATCH',
                body: formData,
            }),
            invalidatesTags: ["Customer"],
        }),

        // Customer Sourse Delete

        deleteCustomerSourseItem: builder.mutation<Item, { id: number }>({
            query: ({ id }) => ({
                url: `${API_ENDPOINTS.CUSTOMER_SOURSE}${id}/`,
                method: 'PATCH',
                body: { status: false }
            }),
            invalidatesTags: ['Customer'],
        }),




    }),
});

export const {
    useGetItemsCustomerQuery,
    useCreateItemSourceMutation,
    useDeleteCustomerSourseItemMutation,
    useUpdateItemSourseMutation,

} = SourseListsApi;
