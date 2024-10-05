import { create } from "zustand";

export type QueryParamType = { page?: number; search?: string, id?: string, status?: string, payment_type?: string, source?: string, products?: string, location?: string };

interface CustomerProps {
  queryParam: QueryParamType;
  setQueryParam: (value: QueryParamType) => void;
}

export const useCustomerStore = create<CustomerProps>((set, get) => ({
  queryParam: { page: 1, },
  setQueryParam: (value: QueryParamType) => {
    const { queryParam } = get();
    if (value) {
      set({ queryParam: { ...queryParam, ...value } });
    }
  },
}));
