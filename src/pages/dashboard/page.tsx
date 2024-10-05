"use client"; // Client-side komponentni belgilang

import DashBoardLayoutProvider from '@/provider/dashboard.layout.provider'
import { useAuth } from '@/store'
import ErrorPage403 from '../error-page/403/page';
import LayoutLoader from '@/components/skeleton/layout-loader';
import AdminDashboard from '@/views/dashboard/admin-dashboard/admin-dashboard';
import SellerDashboard from '@/views/dashboard/seller-dashboard/seller-dashboard';

const Dashboard = () => {
  const { user } = useAuth((state) => state);

  return (
    user?.access ? <DashBoardLayoutProvider >
      {user.role === "admin" ? (
        <AdminDashboard />
      ) : user.role === "seller" ? (
        <SellerDashboard />
      ) : (
        <ErrorPage403 />
      )}
    </DashBoardLayoutProvider> : <LayoutLoader />
  );
};

export default Dashboard;
