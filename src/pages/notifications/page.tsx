"use client";
import DashBoardLayoutProvider from "../../provider/dashboard.layout.provider";
import NotificationMessageDetail from "../../views/notification/notification-detail";

const Notfications = () => {
  return (
    <DashBoardLayoutProvider >
      <NotificationMessageDetail />
    </DashBoardLayoutProvider>
  );
};

export default Notfications;
