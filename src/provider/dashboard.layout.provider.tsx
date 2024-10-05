"use client";
import React from "react";


import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

import LayoutLoader from "../components/skeleton/layout-loader";
import { useSidebar, useThemeStore } from "../store";
import { useMounted } from "../hooks/use-mounted";
import Header from "../components/partials/header";
import Sidebar from "../components/partials/sidebar";
import { cn } from "../lib/utils";
import Footer from "../components/partials/footer";
import ThemeCustomize from "../components/partials/customizer/theme-customizer";
import MobileSidebar from "../components/partials/sidebar/mobile-sidebar";


const DashBoardLayoutProvider = ({ children, }: { children: React.ReactNode }) => {
  const { collapsed } = useSidebar();
  const { layout } = useThemeStore();
  const location = usePathname();
  const mounted = useMounted();
  if (!mounted) {
    return <LayoutLoader />;
  }



  if (layout === "horizontal") {
    return (
      <div>
        <Header />

        <div className={cn("content-wrapper transition-all duration-150 ")}>
          <div
            className=" p-6  page-min-height-horizontal "
          >
            <LayoutWrapper
              location={location}
            >
              {children}
            </LayoutWrapper>
          </div>
        </div>
        <Footer />
        <ThemeCustomize />
      </div>
    );
  }


  return (
    <>
      <Header />
      <Sidebar />

      <div
        className={cn("content-wrapper transition-all duration-150 ", {
          "xl:ml-[248px] ": !collapsed,
          "xl:ml-[72px] ": collapsed,
        })}
      >
        <div
          className="p-6 page-min-height"
        >
          <LayoutWrapper
            location={location}
          >
            {children}
          </LayoutWrapper>
        </div>
      </div >
      <Footer />
      <ThemeCustomize />
    </>
  );
};

export default DashBoardLayoutProvider;

const LayoutWrapper = ({ children, location, }: { children: React.ReactNode, location: any, }) => {
  return (
    <>
      <motion.div
        key={location}
        initial="pageInitial"
        animate="pageAnimate"
        exit="pageExit"
        variants={{
          pageInitial: {
            opacity: 0,
            y: 50,
          },
          pageAnimate: {
            opacity: 1,
            y: 0,
          },
          pageExit: {
            opacity: 0,
            y: -50,
          },
        }}
        transition={{
          type: "tween",
          ease: "easeInOut",
          duration: 0.5,
        }}
      >
        <main>{children}</main>
      </motion.div>

      <MobileSidebar className="left-[300px]" />
    </>
  );
};
