// src/services/api.ts
import { API_ENDPOINTS } from '@/api/api-endpoints';
import baseQuery from '@/api/http';
import { createApi } from '@reduxjs/toolkit/query/react';
import { Item } from './sectors-lists';



export const productsListsApi = createApi({
    reducerPath: 'productsListsApi',
    baseQuery,
    tagTypes: ["Prodcuts"],
    endpoints: (builder) => ({


        //  Customer Products List
        getItemsCustomerProducts: builder.query<Item, string>({
            query: (queryStr) => `${API_ENDPOINTS.PRODUCTS}?` + queryStr,
            providesTags: ['Prodcuts'],
        }),


        //  Products Create 
        createItemProducts: builder.mutation<Item, Partial<FormData>>({
            query: (newItem) => ({
                url: API_ENDPOINTS.PRODUCTS,
                method: 'POST',
                body: newItem,
            }),
            invalidatesTags: ["Prodcuts"]
        }),
        // Products lists Updates
        updateItemProducts: builder.mutation<Item, { id: string; formData: FormData }>({
            query: ({ id, formData }) => ({
                url: `${API_ENDPOINTS.PRODUCTS}${id}/`,
                method: 'PATCH',
                body: formData,
            }),
            invalidatesTags: ["Prodcuts"],
        }),

        // Products lists Delete

        deleteProductsListsItem: builder.mutation<Item, { id: number }>({
            query: ({ id }) => ({
                url: `${API_ENDPOINTS.PRODUCTS}${id}/`,
                method: 'PATCH',
                body: { status: false }
            }),
            invalidatesTags: ['Prodcuts'],
        }),



    }),
});

export const {
    useGetItemsCustomerProductsQuery,
    useCreateItemProductsMutation,
    useUpdateItemProductsMutation,
    useDeleteProductsListsItemMutation
} = productsListsApi;
