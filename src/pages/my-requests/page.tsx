"use client"
import MyRequest from "@/components/pages/my-requests/my-request";
import DashBoardLayoutProvider from "@/provider/dashboard.layout.provider";
import { useAuth } from "@/store";
import ErrorPage403 from "../error-page/403/page";
import LayoutLoader from "@/components/skeleton/layout-loader";

const MyRequests = () => {
  const {  user } = useAuth((state) => state);
  return (
    user.access ? 
    <DashBoardLayoutProvider>
      {(user.role === "seller") ? <MyRequest role={user.role} /> : <ErrorPage403 />}
    </DashBoardLayoutProvider> :<LayoutLoader />
  );
};

export default MyRequests;