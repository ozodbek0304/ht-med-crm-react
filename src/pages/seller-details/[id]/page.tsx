"use client";
import DashBoardLayoutProvider from "@/provider/dashboard.layout.provider";
import SellerDetails from "@/components/pages/seller/seller-details/seller-details";
import { useAuth } from "@/store";
import ErrorPage403 from "../../error-page/403/page";
import LayoutLoader from "@/components/skeleton/layout-loader";

const SellerPage = () => {
  const {user } = useAuth((state) => state);
  return (
    user.access ?
      <DashBoardLayoutProvider >
        {user.role === "admin" ? <SellerDetails /> : <ErrorPage403 />}
      </DashBoardLayoutProvider> : <LayoutLoader />
  );
};

export default SellerPage;
