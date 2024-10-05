"use client"
import CustomerPage from "@/components/pages/customer/customers/customer-page";
import DashBoardLayoutProvider from "@/provider/dashboard.layout.provider";
import { useAuth } from "@/store";
import ErrorPage403 from "../error-page/403/page";
import LayoutLoader from "@/components/skeleton/layout-loader";

const Customers = () => {
  const { user } = useAuth((state) => state);

  return (
    user.access ?
      <DashBoardLayoutProvider >
        {(user.role === "admin" || user.role === "seller") ? < CustomerPage /> : <ErrorPage403 />}
      </DashBoardLayoutProvider> : <LayoutLoader />
  );
};

export default Customers;