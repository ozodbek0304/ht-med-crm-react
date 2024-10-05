"use client"

import DashBoardLayoutProvider from "@/provider/dashboard.layout.provider";
import { useAuth } from "@/store";
import ErrorPage403 from "../error-page/403/page";
import LayoutLoader from "@/components/skeleton/layout-loader";
import AddCustomers from "@/views/customer/add-customers/components/add-customers";


const AddCustomer = () => {
  const {  user } = useAuth((state) => state);
  return (
   user?.access ?  <DashBoardLayoutProvider>
      {user.role === "seller" ? <AddCustomers /> : <ErrorPage403 />}
    </DashBoardLayoutProvider> :<LayoutLoader />
  );
};

export default AddCustomer;