"use client"; // Client-side komponentni belgilang

import AdminDashboard from '@/components/pages/dashboard/admin-dashboard/admin-dashboard'
import SellerDashboard from '@/components/pages/dashboard/seller-dashboard/seller-dashboard'
import DashBoardLayoutProvider from '@/provider/dashboard.layout.provider'
import { useAuth } from '@/store'
import React from 'react'
import ErrorPage403 from '../error-page/403/page';
import LayoutLoader from '@/components/skeleton/layout-loader';

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
