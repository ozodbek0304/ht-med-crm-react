"use client"
import CustomerProfile from "@/components/pages/customer/costumer-details/customerProfile";
import DashBoardLayoutProvider from "@/provider/dashboard.layout.provider";
import { useAuth } from "@/store";
import ErrorPage403 from "../../error-page/403/page";
import LayoutLoader from "@/components/skeleton/layout-loader";

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