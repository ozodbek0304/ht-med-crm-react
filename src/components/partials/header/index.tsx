"use client";
import ThemeButton from "./theme-button";
import ProfileInfo from "./profile-info";
import VerticalHeader from "./vertical-header";
import HorizontalHeader from "./horizontal-header";
import HorizontalMenu from "./horizontal-menu";
import NotificationMessage from "./notification-message";
import MobileMenuHandler from "./mobile-menu-handler";
import FullScreen from "./full-screen";
import { useSidebar, useThemeStore } from "../../../store";
import { useMediaQuery } from "../../../hooks/use-media-query";
import { cn } from "../../../lib/utils";


const NavTools = ({ isDesktop }: { isDesktop: boolean; }) => {
  return (
    <div className="nav-tools flex items-center  gap-2">
      {isDesktop && <FullScreen />}
      <ThemeButton />

      <NotificationMessage />

      <div className="pl-2">
        <ProfileInfo />
      </div>
      {!isDesktop && <MobileMenuHandler />}
    </div>
  );
};


const Header = () => {
  const { layout, navbarType } = useThemeStore();
  const isDesktop = useMediaQuery("(min-width: 1280px)");
  const { collapsed } = useSidebar();


  //  horizontal layout headers menu
  if (layout === "horizontal" && navbarType !== "hidden") {
    return (
      <header className="z-50 sticky top-0 ">
        <div className="w-full bg-white dark:bg-slate-800   md:px-6 px-[15px] py-3 border-b">
          <div className="flex justify-between items-center h-full">
            <HorizontalHeader />
            <NavTools
              isDesktop={isDesktop}

            />
          </div>
        </div>
        {isDesktop && (
          <div className=" bg-white dark:bg-slate-800  w-full px-6  shadow-md">
            <HorizontalMenu />
          </div>
        )}
      </header>
    );
  }

  //  Vertical layout headers menu


  return (
    <header
      className={cn("z-50 sticky top-0", {
        "xl:ml-[248px] ": !collapsed,
        "xl:ml-[72px] ": collapsed
      })}
    >
      <div className="w-full bg-card/90 backdrop-blur-lg md:px-6 px-[15px] py-3 border-b">
        <div className="flex justify-between items-center h-full">
          <VerticalHeader
          />
          <NavTools
            isDesktop={isDesktop}
          />
        </div>
      </div>
    </header >
  );
};

export default Header;
