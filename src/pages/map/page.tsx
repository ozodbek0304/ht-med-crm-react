"use client"
import DashBoardLayoutProvider from "@/provider/dashboard.layout.provider";
import { useAuth } from "@/store";
import ErrorPage403 from "../error-page/403/page";
import LayoutLoader from "@/components/skeleton/layout-loader";
import MapComponent from "@/views/map/map-page";
const MapPage = () => {
  const { user } = useAuth((state) => state);

  return (
    user.access ?
    <DashBoardLayoutProvider >
      {(user.role === "admin" || user.role === "seller") ? <MapComponent /> : <ErrorPage403 />}
    </DashBoardLayoutProvider> :<LayoutLoader />
  );
};

export default MapPage;