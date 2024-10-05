"use client";
import DashBoardLayoutProvider from "../../provider/dashboard.layout.provider";
import LayoutLoader from "../../components/skeleton/layout-loader";
import ErrorPage403 from "../error-page/403/page";
import { useAuth } from "../../store";
import SellerDetails from "../../views/seller/seller-details/seller-details";

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
