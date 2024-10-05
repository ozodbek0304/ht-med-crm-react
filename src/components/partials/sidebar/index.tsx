"use client";
import { useMediaQuery } from "@/hooks/use-media-query";
import PopoverSidebar from "./popover";
import MobileSidebar from "./mobile-sidebar";

const Sidebar = () => {
  const isDesktop = useMediaQuery("(min-width: 1280px)");

  let selectedSidebar = null;

   
  if (!isDesktop) {
    selectedSidebar = <MobileSidebar />;
  } else {
    selectedSidebar = <PopoverSidebar  />;
  }

  return <div><PopoverSidebar/></div>;
};

export default Sidebar;
