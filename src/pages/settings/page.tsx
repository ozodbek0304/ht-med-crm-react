"use client";
import DashBoardLayoutProvider from "../../provider/dashboard.layout.provider";
import Settings from "../../views/settings/settings";


const SettingsPage: React.FC = () => {
 
  return (
    <DashBoardLayoutProvider >
      <Settings />
    </DashBoardLayoutProvider>
  );
};

export default SettingsPage;