import { API_ENDPOINTS } from "@/api/api-endpoints";
import baseQuery from "@/api/http";
import { CalendarIsAvailableListResult, CalendarItem } from "@/interfaces/calendar-list";
import { createApi } from "@reduxjs/toolkit/query/react";

export const calendarListApi = createApi({
  reducerPath: "calendarListApi",
  baseQuery,
  tagTypes: ["calendar"],
  endpoints: (builder) => ({
    getCalendarList: builder.query<CalendarIsAvailableListResult, string>({
      query: (value) => API_ENDPOINTS.CALENDAR_IS_AVAILABLE + "?" + value,
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
  useGetCalendarListQuery,
  useCreateItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
} = calendarListApi;
