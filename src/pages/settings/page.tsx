"use client";

import Settings from "@/components/pages/settings/settings";
import DashBoardLayoutProvider from "@/provider/dashboard.layout.provider";


const SettingsPage: React.FC = () => {
 

  return (
    <DashBoardLayoutProvider >
      <Settings />

    </DashBoardLayoutProvider>
  );
};

export default SettingsPage;