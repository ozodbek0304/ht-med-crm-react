// src/services/api.ts
import baseQuery from '../../api/http';
import { API_ENDPOINTS } from '../../api/api-endpoints';
import { createApi } from "@reduxjs/toolkit/query/react";
import { CreateItemComment, ItemComment } from '../../interfaces/commit-page';

export const commentsListApi = createApi({
  reducerPath: "commentsListApi",
  baseQuery,
  tagTypes: ["Comment"],
  endpoints: (builder) => ({
    getComments: builder.query<ItemComment, string>({
      query: (value) => API_ENDPOINTS.COMMENT_LIST + "?"+value,
      providesTags: ["Comment"],
    }),

    createItem: builder.mutation<CreateItemComment, Partial<CreateItemComment>>(
      {
        query: (newItem) => ({
          url: API_ENDPOINTS.CREATE_COMMENT + `/${newItem.id}/`,
          method: "POST",
          body: { text: newItem?.text },
        }),
        invalidatesTags: ["Comment"],
      }
    ),

    updateItem: builder.mutation<
      ItemComment,
      { id: string; changes: Partial<ItemComment> }
    >({
      query: ({ id, changes }) => ({
        url: API_ENDPOINTS.COMMENT_LIST + id + "/",
        method: "PATCH",
        body: { text: changes },
      }),
      invalidatesTags: ["Comment"],
    }),

    deleteItem: builder.mutation<void, number>({
      query: (id) => ({
        url: API_ENDPOINTS.COMMENT_DELETE + id + "/",
        method: "DELETE",
      }),
      invalidatesTags: ["Comment"],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useCreateItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
} = commentsListApi;
