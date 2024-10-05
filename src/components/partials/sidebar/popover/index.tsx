"use client";
import React from "react";

import SidebarLogo from "../common/logo";
import SingleMenuItem from "./single-menu-item";
import AddBlock from "../common/add-block";
import { Icon } from "@iconify/react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { usePathname } from "next/navigation";
import { useAuth, useSidebar, useThemeStore } from "../../../../store";
import { initialUser } from "../../../../config/site";
import { cn, getDynamicPath, isLocationMatch } from "../../../../lib/utils";
import { Separator } from "../../../ui/separator";
import { ScrollArea } from "../../../ui/scroll-area";


const PopoverSidebar = () => {
  const { collapsed } = useSidebar();
  const { layout } = useThemeStore();
  const { setRoleLink, setUser, accountLink } = useAuth((state) => state);

  function LogOut() {
    setUser(initialUser);
    setRoleLink([]);
    window.location.assign("/auth");
    localStorage.clear();
  }

  const pathname = usePathname();
  const locationName = getDynamicPath(pathname);

  React.useEffect(() => {
    let subMenuIndex = null;
    let multiMenuIndex = null;
    accountLink?.map((item: any, i: number) => {
      if (item?.child) {
        item.child.map((childItem: any, j: number) => {
          if (isLocationMatch(childItem.href, locationName)) {
            subMenuIndex = i;
          }
          if (childItem?.multi_menu) {
            childItem.multi_menu.map((multiItem: any, k: number) => {
              if (isLocationMatch(multiItem.href, locationName)) {
                subMenuIndex = i;
                multiMenuIndex = j;
              }
            });
          }
        });
      }
    });
  }, [locationName]);

  // menu title

  
  return (
    <div
      className={cn("fixed  top-0  border-r  ", {
        "w-[248px]": !collapsed,
        "w-[72px]": collapsed,
        "m-6 bottom-0   bg-card rounded-md": layout === "semibox",
        "h-full   bg-card ": layout !== "semibox",
      })}
    >
      <SidebarLogo />
      <Separator />
      <ScrollArea
        className={cn("sidebar-menu  h-[calc(100%-80px)] ", {
          "px-4": !collapsed,
        })}
      >
        <ul
          className={cn("space-y-1 mt-3 lg:mt-6", {
            " space-y-2 text-center mt-3": collapsed,
          })}
        >
          {accountLink.map((item: any, i: number) => (
            <li key={`menu_key_${i}`}>
              <SingleMenuItem
                item={item}
                collapsed={collapsed}
              />

            </li>
          ))}
          <li onClick={LogOut} className="cursor-pointer">


            <>
              {collapsed ? (
                <div>
                  <Tooltip.Provider>
                    <Tooltip.Root>
                      <Tooltip.Trigger asChild>
                        <span
                          className={"h-12 w-12 mx-auto rounded-md  transition-all duration-300 inline-flex flex-col items-center justify-center  relative  "}
                        >
                          <Icon icon={"mingcute:exit-line"} className="h-6 w-6 text-default-700" />
                        </span>
                      </Tooltip.Trigger>
                      <Tooltip.Portal>
                        <Tooltip.Content
                          side="right"
                          className="bg-primary  text-primary-foreground data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-violet11 select-none rounded-[4px]  px-[15px] py-[10px] text-[15px] leading-none  shadow-sm will-change-[transform,opacity]"
                          sideOffset={5}
                        >
                          Chiqish
                          <Tooltip.Arrow className="fill-primary" />
                        </Tooltip.Content>
                      </Tooltip.Portal>
                    </Tooltip.Root>
                  </Tooltip.Provider>
                </div>
              ) : (
                <div
                  className={"flex gap-3  text-default-700 text-sm capitalize px-[10px] font-medium py-3 rounded cursor-pointer hover:bg-primary hover:text-primary-foreground"}
                >
                  <span className="flex-grow-0">
                    <Icon icon={"mingcute:exit-line"} className="h-5 w-5 text-default-700" />
                  </span>
                  <div className="text-box flex-grow ">Chiqish</div>

                  {/* {badge && <Badge className=" rounded">{item.badge}</Badge>} */}
                </div>
              )}
            </>


          </li>

        </ul>
        {!collapsed && (
          <div className="-mx-2 ">
            <AddBlock />
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default PopoverSidebar;
