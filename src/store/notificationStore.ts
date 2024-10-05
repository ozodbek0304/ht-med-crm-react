import { create } from "zustand";

export type QueryParamType = { page?: number; search?: string };

interface NotificationProps {
  queryParam: QueryParamType;
  setQueryParam: (value: QueryParamType) => void;
}

export const useNotificationStore = create<NotificationProps>((set, get) => ({
  queryParam: { page: 1 },
  setQueryParam: (value: QueryParamType) => {
    const { queryParam } = get();
    if (value) {
      set({ queryParam: { ...queryParam, ...value } });
    }
  },
}));
