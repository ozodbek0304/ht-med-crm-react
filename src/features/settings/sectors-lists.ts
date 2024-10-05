// src/services/api.ts
import { API_ENDPOINTS } from '@/api/api-endpoints';
import baseQuery from '@/api/http';
import { createApi } from '@reduxjs/toolkit/query/react';

export interface FilterResult {
    id: number;
    name: string;
    status: boolean;
    image?: string;
    inn_number?: number;
}

export interface Item {
    results: FilterResult[];
    count: number;
    item?: any
}


export const SectorsListsApi = createApi({
    reducerPath: 'SectorsListsApi',
    baseQuery,
    tagTypes: ['Sector'],
    endpoints: (builder) => ({

        //  Sector List
        getItems: builder.query<Item, number>({
            query: (page) => `${API_ENDPOINTS.SECTOR_LIST}?page=${page}`,
            providesTags: ['Sector']
        }),

        //  Sector Create 
        createItem: builder.mutation<Item, Partial<FilterResult>>({
            query: (newItem) => ({
                url: API_ENDPOINTS.SECTOR_LIST,
                method: 'POST',
                body: newItem,
            }),
            invalidatesTags: ["Sector"]
        }),
        // Sektor Updates
        updateItem: builder.mutation<Item, { id: string; changes: Partial<FilterResult> }>({
            query: ({ id, changes }) => ({
                url: `${API_ENDPOINTS.SECTOR_LIST}${id}/`,
                method: 'PATCH',
                body: changes,
            }),
            invalidatesTags: ["Sector"],
        }),

        // Sektor delete

        deleteSectorItem: builder.mutation<Item, { id: number }>({
            query: ({ id }) => ({
                url: `${API_ENDPOINTS.SECTOR_LIST}${id}/`,
                method: 'PATCH',
                body: { status: false }
            }),
            invalidatesTags: ['Sector'],
        })

    }),
});

export const {
    useGetItemsQuery,
    useDeleteSectorItemMutation,
    useCreateItemMutation,
    useUpdateItemMutation,

} = SectorsListsApi;
