"use client";

import PopoverSidebar from "./popover";
import MobileSidebar from "./mobile-sidebar";
import { useMediaQuery } from "../../../hooks/use-media-query";

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
