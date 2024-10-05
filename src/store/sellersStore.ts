import { create } from "zustand";

type QueryParamType = { page?: number; search?: string };

interface SellersProps {
  queryParam: QueryParamType;
  setQueryParam: (value: QueryParamType) => void;
}

export const useSellerStore = create<SellersProps>((set, get) => ({
  queryParam: { page: 1, },
  setQueryParam: (value: QueryParamType) => {
    const { queryParam } = get();
    if (value) {
      set({ queryParam: { ...queryParam, ...value } });
    }
  },
}));
