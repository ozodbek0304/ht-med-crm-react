"use client";
import DashBoardLayoutProvider from "@/provider/dashboard.layout.provider";
import { useAuth } from "@/store";
import LayoutLoader from "@/components/skeleton/layout-loader";
import SellerDetails from "@/views/seller/seller-details/seller-details";
import ErrorPage403 from "../error-page/403/page";

const SellerPageDetails = () => {
  const {user } = useAuth((state) => state);
  return (
    user.access ?
      <DashBoardLayoutProvider >
        {user.role === "admin" ? <SellerDetails /> : <ErrorPage403 />}
      </DashBoardLayoutProvider> : <LayoutLoader />
  );
};

export default SellerPageDetails;
