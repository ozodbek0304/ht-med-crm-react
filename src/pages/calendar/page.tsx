"use client"
import DashBoardLayoutProvider from "../../provider/dashboard.layout.provider";

import ErrorPage403 from "../error-page/403/page";
import LayoutLoader from "../../components/skeleton/layout-loader";
import { useAuth } from "../../store";
import CalenderPage from "../../views/calendar/page";


const CalendarPage = () => {
  const { user } = useAuth((state) => state);
  return (
    user?.access ?
    <DashBoardLayoutProvider>
      {(user.role === "admin" || user.role === "seller") ? <CalenderPage /> : <ErrorPage403 />}
    </DashBoardLayoutProvider> :<LayoutLoader />
  );
};

export default CalendarPage;