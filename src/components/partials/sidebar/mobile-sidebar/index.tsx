"use client";
import { cn } from "@/lib/utils";
import { useAuth, useSidebar } from "@/store";
import SidebarLogo from "../common/logo";
import { ScrollArea } from "@/components/ui/scroll-area";
import SingleMenuItem from "./single-menu-item";

const MobileSidebar = ({ className }: { className?: string }) => {
  const { mobileMenu, setMobileMenu } = useSidebar();
  const { collapsed } = useSidebar();
  const { accountLink } = useAuth((state) => state);



  return (
    <>
      <div
        className={cn(
          "fixed top-0  bg-card h-full w-[248px] z-[9999] ",
          className,
          {
            " -left-[300px] invisible opacity-0  ": !mobileMenu,
            " left-0 visible opacity-100  ": mobileMenu,
          }
        )}
      >
        <SidebarLogo hovered={collapsed} />
        <ScrollArea
          className={cn("sidebar-menu  h-[calc(100%-80px)] ", {
            "px-4": !collapsed,
          })}
        >
          <ul
            className={cn("", {
              " space-y-2 text-center": collapsed,
            })}
          >
            {accountLink.map((item:any, i:number) => (
              <li key={`menu_key_${i}`}>
                {/* single menu  */}

                <SingleMenuItem item={item} collapsed={collapsed} />

              </li>
            ))}
          </ul>
        </ScrollArea>
      </div>
      {mobileMenu && (
        <div
          onClick={() => setMobileMenu(false)}
          className="overlay bg-black/60 backdrop-filter backdrop-blur-sm opacity-100 fixed inset-0 z-[999]"
        ></div>
      )}
    </>
  );
};

export default MobileSidebar;
