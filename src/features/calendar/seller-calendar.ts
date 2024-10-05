import { API_ENDPOINTS } from "@/api/api-endpoints";
import baseQuery from "@/api/http";
import { CalendarItem, CalendarListResult } from "@/interfaces/calendar-list";
import { createApi } from "@reduxjs/toolkit/query/react";

export const sellerCalendarListApi = createApi({
  reducerPath: "sellerCalendarListApi",
  baseQuery,
  tagTypes: ["calendar"],
  endpoints: (builder) => ({
    getSellerCalendarList: builder.query<CalendarListResult, string>({
      query: (value) => API_ENDPOINTS.SELLER_CALENDAR_LIST + "?" + value,
      providesTags: ["calendar"],
    }),

    createItem: builder.mutation<CalendarItem, Partial<CalendarItem>>({
      query: (newItem) => ({
        url: API_ENDPOINTS.DASHBOARD_CARD,
        method: "POST",
        body: newItem,
        providesTags: ["calendar"],
      }),
    }),

    updateItem: builder.mutation<CalendarItem,{ id: string; changes: Partial<CalendarItem> }>({
      query: ({ id, changes }) => ({
        url: API_ENDPOINTS.DASHBOARD_CARD + "/" + id,
        method: "PATCH",
        body: changes,
        providesTags: ["calendar"],
      }),
    }),

    deleteItem: builder.mutation<void, string>({
      query: (id) => ({
        url: API_ENDPOINTS.DASHBOARD_CARD + "/" + id,
        method: "DELETE",
        providesTags: ["calendar"],
      }),
    }),
  }),
});

export const {
  useGetSellerCalendarListQuery,
  useCreateItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
} = sellerCalendarListApi;
