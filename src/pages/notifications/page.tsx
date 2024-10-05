"use client";
import NotificationMessageDetail from "@/components/pages/notification/notification-detail";
import DashBoardLayoutProvider from "@/provider/dashboard.layout.provider";

const Notfications = () => {
  return (
    <DashBoardLayoutProvider >
      <NotificationMessageDetail />
    </DashBoardLayoutProvider>
  );
};

export default Notfications;
