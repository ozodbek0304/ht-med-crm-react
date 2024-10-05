import { cn } from "@/lib/utils";
import { useSidebar } from "@/store";
import React from "react";


const Footer = () => {
  const { collapsed } = useSidebar();

  return (
    <footer
      className={cn("bg-card relative py-4 px-6  border-t", {
        "xl:ml-[248px] ": !collapsed,
        "xl:ml-[72px]": collapsed,
      })}
    >
      <div className="block md:flex md:justify-between text-muted-foreground">
        <p className="sm:mb-0 text-xs md:text-sm">
          MULLIK HUQUQI ©  Barcha huquqlar himoyalangan
        </p>
        <p className="mb-0 text-xs md:text-sm">
          Soff Hub tomonidan ishlab chiqarilgan

        </p>
      </div>
    </footer>
  );


};

export default Footer;

