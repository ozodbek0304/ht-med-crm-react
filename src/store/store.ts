import { dashboardCardApi } from "@/features/admin-dashboard/admin-dashboard";
import { calendarListApi } from "@/features/calendar/calendar-isAvailable";
import { sellerCalendarListApi } from "@/features/calendar/seller-calendar";
import { commentsListApi } from "@/features/comments/comment";
import { customerCardApi } from "@/features/customer/customer";
import { notificationListApi } from "@/features/notifications/notifications";
import { profileApi } from "@/features/profile/profile";
import { sellerDashboardApi } from "@/features/seller-dashboard/seller-dashboard";
import { sellerListsApi } from "@/features/seller/seller";
import { sellerRequestListsApi } from "@/features/selller-request/seller-request";
import { locationListsApi } from "@/features/settings/location-lists";
import { paymentMethodsListsApi } from "@/features/settings/payment-methods-lists";
import { paymentTypeListsApi } from "@/features/settings/payment-type-lists";
import { productsListsApi } from "@/features/settings/products-lists";
import { SectorsListsApi } from "@/features/settings/sectors-lists";
import { SectorMeicalListsApi } from "@/features/settings/sectors-medical-lists";
import { SourseListsApi } from "@/features/settings/sourse-lists";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    [dashboardCardApi.reducerPath]: dashboardCardApi.reducer,
    [customerCardApi.reducerPath]: customerCardApi.reducer,
    [locationListsApi.reducerPath]: locationListsApi.reducer,
    [sellerListsApi.reducerPath]: sellerListsApi.reducer,
    [notificationListApi.reducerPath]: notificationListApi.reducer,
    [SectorsListsApi.reducerPath]: SectorsListsApi.reducer,
    [SectorMeicalListsApi.reducerPath]: SectorMeicalListsApi.reducer,
    [SourseListsApi.reducerPath]: SourseListsApi.reducer,
    [productsListsApi.reducerPath]: productsListsApi.reducer,
    [paymentTypeListsApi.reducerPath]: paymentTypeListsApi.reducer,
    [paymentMethodsListsApi.reducerPath]: paymentMethodsListsApi.reducer,
    [commentsListApi.reducerPath]: commentsListApi.reducer,
    [sellerDashboardApi.reducerPath]: sellerDashboardApi.reducer,
    [sellerRequestListsApi.reducerPath]: sellerRequestListsApi.reducer,
    [sellerCalendarListApi.reducerPath]: sellerCalendarListApi.reducer,
    [calendarListApi.reducerPath]: calendarListApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(dashboardCardApi.middleware)
      .concat(customerCardApi.middleware)
      .concat(locationListsApi.middleware)
      .concat(sellerListsApi.middleware)
      .concat(notificationListApi.middleware)
      .concat(SectorsListsApi.middleware)
      .concat(SectorMeicalListsApi.middleware)
      .concat(SourseListsApi.middleware)
      .concat(productsListsApi.middleware)
      .concat(paymentTypeListsApi.middleware)
      .concat(paymentMethodsListsApi.middleware)
      .concat(commentsListApi.middleware)
      .concat(sellerDashboardApi.middleware)
      .concat(sellerRequestListsApi.middleware)
      .concat(sellerCalendarListApi.middleware)
      .concat(calendarListApi.middleware)
      .concat(profileApi.middleware)

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
