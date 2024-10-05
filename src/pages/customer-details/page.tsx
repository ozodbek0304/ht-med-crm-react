"use client"
import DashBoardLayoutProvider from "@/provider/dashboard.layout.provider";
import { useAuth } from "@/store";
import LayoutLoader from "@/components/skeleton/layout-loader";
import CustomerProfile from "@/views/customer/costumer-details/customerProfile";
import ErrorPage403 from "../error-page/403/page";

const CustomerInformation = () => {
  const {  user } = useAuth((state) => state);
  return (
    user.access ?
    <DashBoardLayoutProvider >
       {(user.role==="admin" || user.role==="seller") ?   <CustomerProfile/> : <ErrorPage403/>}
      </DashBoardLayoutProvider> :<LayoutLoader />
  );
};

export default CustomerInformation;