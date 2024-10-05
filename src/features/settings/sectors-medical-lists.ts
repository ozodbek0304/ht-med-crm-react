// src/services/api.ts
import baseQuery from '../../api/http';
import { API_ENDPOINTS } from '../../api/api-endpoints';
import { createApi } from '@reduxjs/toolkit/query/react';
import { FilterResult, Item } from './sectors-lists';



export const SectorMeicalListsApi = createApi({
    reducerPath: 'SectorMeicalListsApi',
    baseQuery,
    tagTypes: ['Sector-Medical'],
    endpoints: (builder) => ({


        //  Sector-Medical List
        getItemById: builder.query<Item, number>({
            query: (value) => API_ENDPOINTS.SECTOR_MEDICAL + `?page=${value}`,
            providesTags: ['Sector-Medical']
        }),

        //  Sector-Medical Create 
        createItemMedical: builder.mutation<Item, Partial<FilterResult>>({
            query: (newItem) => ({
                url: API_ENDPOINTS.SECTOR_MEDICAL,
                method: 'POST',
                body: newItem,
            }),
            invalidatesTags: ["Sector-Medical"]
        }),

        // Sektor-Medical  Updates
        updateItemMedical: builder.mutation<Item, { id: string; changes: Partial<FilterResult> }>({
            query: ({ id, changes }) => ({
                url: `${API_ENDPOINTS.SECTOR_MEDICAL}/${id}/`,
                method: 'PATCH',
                body: changes,
            }),
            invalidatesTags: ["Sector-Medical"],
        }),

        // Sector-medical delete

        deleteSectorMedicalItem: builder.mutation<Item, { id: number }>({
            query: ({ id }) => ({
                url: `${API_ENDPOINTS.SECTOR_MEDICAL}/${id}/`,
                method: 'PATCH',
                body: { status: false }
            }),
            invalidatesTags: ['Sector-Medical'],
        }),


    }),
});

export const {
    useGetItemByIdQuery,
    useCreateItemMedicalMutation,
    useUpdateItemMedicalMutation,
    useDeleteSectorMedicalItemMutation,

} = SectorMeicalListsApi;
