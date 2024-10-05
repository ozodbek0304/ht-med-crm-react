// src/services/api.ts
import { API_ENDPOINTS } from '@/api/api-endpoints';
import baseQuery from '@/api/http';
import { createApi } from '@reduxjs/toolkit/query/react';
import { Item } from './sectors-lists';


export interface FilterResultSearch {
    id: number;
    full_name: string;
    created_at: string;
    image?: string;
    phone?: string;
}

export interface ItemSearch {
    results: FilterResultSearch[];
    count: number;
}




export const locationListsApi = createApi({
    reducerPath: 'locationListsApi',
    baseQuery,
    endpoints: (builder) => ({

        // Location Lists 
        getItemsWithFilters: builder.query<Item, void>({
            query: () => API_ENDPOINTS.LOCATION,

        }),

        getItemsUserSearch: builder.query<ItemSearch, string>({
            query: (value) => API_ENDPOINTS.USER_SEARCH + `?search=${value}`,
        }),


    }),
});

export const {
    useGetItemsWithFiltersQuery,
    useGetItemsUserSearchQuery,

} = locationListsApi;
