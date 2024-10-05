"use client"

import DashBoardLayoutProvider from "../../provider/dashboard.layout.provider";

import ErrorPage403 from "../error-page/403/page";
import LayoutLoader from "../../components/skeleton/layout-loader";
import MyRequestsPages from "../../views/my-requests/my-request";
import { useAuth } from "../../store";


const MyRequests = () => {
  const {  user } = useAuth((state) => state);
  return (
    user.access ? 
    <DashBoardLayoutProvider>
      {(user.role === "seller") ? <MyRequestsPages role={user.role} /> : <ErrorPage403 />}
    </DashBoardLayoutProvider> :<LayoutLoader />
  );
};

export default MyRequests;