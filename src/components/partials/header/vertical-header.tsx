import React, { useState } from "react";
import SelectSearch from "../../form/search";
import { Link } from "react-router-dom";
import { cn } from "../../../lib/utils";
import { useSidebar, useThemeStore } from "../../../store";
import { useMediaQuery } from "../../../hooks/use-media-query";


const MenuBar = ({ collapsed, setCollapsed }: { collapsed: boolean, setCollapsed: (value: boolean) => void; }) => {
  return (
    <button
      className="relative group  disabled:cursor-not-allowed opacity-50"
      onClick={() => setCollapsed(!collapsed)}
    >
      <div>
        <div
          className={cn(
            "flex flex-col justify-between w-[20px] h-[16px] transform transition-all duration-300 origin-center overflow-hidden",
            {
              "-translate-x-1.5 rotate-180": collapsed,
            }
          )}
        >
          <div
            className={cn(
              "bg-card-foreground h-[2px] transform transition-all duration-300 origin-left delay-150",
              {
                "rotate-[42deg] w-[11px]": collapsed,
                "w-7": !collapsed,
              }
            )}
          ></div>
          <div
            className={cn(
              "bg-card-foreground h-[2px] w-7 rounded transform transition-all duration-300",
              {
                "translate-x-10": collapsed,
              }
            )}
          ></div>
          <div
            className={cn(
              "bg-card-foreground h-[2px] transform transition-all duration-300 origin-left delay-150",
              {
                "-rotate-[43deg] w-[11px]": collapsed,
                "w-7": !collapsed,
              }
            )}
          ></div>
        </div>
      </div>
    </button>
  );
};

type VerticalHeaderProps = {
};
const VerticalHeader: React.FC<VerticalHeaderProps> = () => {
  const { collapsed, setCollapsed, subMenu, sidebarType } = useSidebar();
  const { layout } = useThemeStore();
  const isDesktop = useMediaQuery("(min-width: 1280px)");
  const isMobile = useMediaQuery("(min-width: 768px)");
  const [search, setSearch] = useState('');
  let LogoContent = null;
  let menuBarContent = null;
  let searchButtonContent = null;

  const MainLogo = (
    <Link to="/dashboard" className=" text-primary ">
       {/* <Image src={logo} alt="logo" height={32} width={32} /> */}
    </Link>
  );
  const SearchButton = (
    <div
      className=" w-full inline-flex  gap-2 items-center text-default-600 text-sm"
    >
      <div className="md:w-[80%] md:block hidden">
        <SelectSearch setSearch={setSearch} search={search} /></div>

    </div>
  );



  if (layout === "vertical" && !isDesktop) {
    LogoContent = MainLogo;
  }

   

  // menu bar content condition
  if (isDesktop) {
    menuBarContent = (
      <MenuBar collapsed={collapsed} setCollapsed={setCollapsed} />
    );
  }
  if (sidebarType === "classic") {
    menuBarContent = (
      <MenuBar collapsed={collapsed} setCollapsed={setCollapsed} />
    );
  }
  
  if (isMobile) {
    searchButtonContent = SearchButton;
  }
  if (sidebarType === "classic") {
    searchButtonContent = SearchButton;
  }
  return (
    <>
      <div className="flex w-full items-center md:gap-6 gap-3">
        {LogoContent}
        {menuBarContent}
        {searchButtonContent}
      </div>
    </>
  );
};

export default VerticalHeader;
