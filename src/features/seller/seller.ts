// src/services/api.ts
import baseQuery from '../../api/http';
import { API_ENDPOINTS } from '../../api/api-endpoints';
import { CreateItem, ItemType, SellerDetailsItem,  UpdateItem } from "../../interfaces/seller-page";
import { createApi } from "@reduxjs/toolkit/query/react";





export const sellerListsApi = createApi({
  reducerPath: "sellerListsApi",
  baseQuery,
  tagTypes: ["seller"],

  endpoints: (builder) => ({

    getItems: builder.query<ItemType, string>({
      query: (queryStr) => `${API_ENDPOINTS.SELLER}?` + queryStr,
      providesTags: ["seller"],
    }),


    getDetails: builder.query<SellerDetailsItem, number>({
      query: (id) => API_ENDPOINTS.SELLER_DETAILS + `/${id}/`,
      providesTags: ["seller"],
    }),


    createItem: builder.mutation<CreateItem, Partial<CreateItem>>({
      query: (newItem) => ({
        url: API_ENDPOINTS.CREATE_SELLER,
        method: "POST",
        body: newItem,
      }),
      invalidatesTags: ["seller"],
    }),

    updateItem: builder.mutation<UpdateItem, { id: string; changes: Partial<UpdateItem> }>({
      query: ({ id, changes }) => ({
        url: API_ENDPOINTS.SELLER_UPDATE + `/${id}/`,
        method: "PATCH",
        body: changes,
      }),
      invalidatesTags: ["seller"],
    }),


    deleteItem: builder.mutation<void, string>({
      query: (id) => ({
        url: API_ENDPOINTS.SELLER + "/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["seller"],
    }),

    
  }),
});

export const {
  useGetItemsQuery,
  useGetDetailsQuery,
  useCreateItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
} = sellerListsApi;
