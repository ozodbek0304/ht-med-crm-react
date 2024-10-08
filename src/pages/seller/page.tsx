"use client";
import DashBoardLayoutProvider from "../../provider/dashboard.layout.provider";
import ErrorPage403 from "../error-page/403/page";
import LayoutLoader from "../../components/skeleton/layout-loader";
import { useAuth } from "../../store";
import SellerComponent from "../../views/seller/seller.tsx/seller-page";

const SellerPage = () => {
  const { user } = useAuth((state) => state);

  return (
    user.access ?
    <DashBoardLayoutProvider>
      {user.role === "admin" ? (
        <SellerComponent />
      ) : (
        <ErrorPage403 />
      )}

    </DashBoardLayoutProvider> :<LayoutLoader />
  );
};

export default SellerPage;
