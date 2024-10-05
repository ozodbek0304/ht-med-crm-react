// src/services/api.ts
import { API_ENDPOINTS } from '@/api/api-endpoints';
import baseQuery from '@/api/http';
import { CustomerDetailsSeller, Item, ResultDetails } from '@/interfaces/customer';
import { createApi } from '@reduxjs/toolkit/query/react';





export const customerCardApi = createApi({
    reducerPath: 'CustomerList',
    baseQuery,
    tagTypes: ["customer"],
    endpoints: (builder) => ({
        getItems: builder.query<Item, string>({
            query: (value) => API_ENDPOINTS.CUSTOMER + "?" + value,
            providesTags: ["customer"]
        }),

        getItemsDetails: builder.query<ResultDetails, string>({
            query: (id) => API_ENDPOINTS.CUSTOMER_DETAILS + `/${id}/`,
        }),


        getItemCustomerCount: builder.query<any, void>({
            query: () => API_ENDPOINTS.CUSTOMER_STATUS_COUNT,
        }),

        getItemDetailsSellers: builder.query<CustomerDetailsSeller, string>({
            query: (id) => API_ENDPOINTS.CUSTOMER_DETAILS_SELLERS + id + "/",
        }),




        createItem: builder.mutation<Item, Partial<any>>({
            query: (newItem) => ({
                url: API_ENDPOINTS.CUSTOMER,
                method: 'POST',
                body: newItem,
            }),
            invalidatesTags: ["customer"]
        }),

        updateItem: builder.mutation<Item, { id: string; changes: Partial<any> }>({
            query: ({ id, changes }) => ({
                url: API_ENDPOINTS.CUSTOMER + id + "/",
                method: 'PATCH',
                body: changes,
            }),
            invalidatesTags: ["customer"]

        }),

        deleteItem: builder.mutation<void, string>({
            query: (id) => ({
                url: API_ENDPOINTS.CUSTOMER + '/' + id,
                method: 'DELETE',
            }),
            invalidatesTags: ["customer"]
        }),

    }),
});

export const {
    useGetItemsQuery,
    useLazyGetItemsDetailsQuery,
    useGetItemCustomerCountQuery,
    useCreateItemMutation,
    useUpdateItemMutation,
    useDeleteItemMutation,
    useLazyGetItemDetailsSellersQuery,
} = customerCardApi;
