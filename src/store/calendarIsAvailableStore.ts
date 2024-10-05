import { create } from "zustand";

export type QueryParamType = {start_date?:string,end_date?:string };

interface CalendarProps {
  queryParam: QueryParamType;
  setQueryParam: (value: QueryParamType) => void;
}

export const useCalendarIsAvailableStore = create<CalendarProps>((set, get) => ({
  queryParam: {},
  setQueryParam: (value: QueryParamType) => {
    const { queryParam } = get();
    if (value) {
      set({ queryParam: { ...queryParam, ...value } });
    }
  },
}));
