import { BaseQueryFn, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { FetchArgs } from '@reduxjs/toolkit/query';
import { useAuth } from '../store/index';

export const baseURL = process.env.NEXT_PUBLIC_SITE_URL; 
const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = fetchBaseQuery({
  baseUrl: baseURL, 
  prepareHeaders: (headers) => {
    const { user } = useAuth.getState();
    const token = user?.access;

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers; 
  },
});

export default baseQuery;
