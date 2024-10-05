"use client";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ThemeChange from "./theme-change";
import SelectLayout from "./select-layout";
import SelectTheme from "./select-theme";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Settings } from "@/components/svg";


const ThemeCustomize = ({
  trigger = (
    <div className="fixed right-4  bottom-14 z-50">
      <Button size="icon" className=" relative h-12 w-12  rounded-full ">
        <Settings className="h-7 w-7 animate-spin" />
      </Button>
    </div>
  ),
}) => {
 

  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent
        side={"right"}
        overlayClass=" bg-transparent backdrop-blur-none"
        className="lg:w-3/4 w-full max-w-full md:max-w-sm px-6 pt-0 pb-6"
      >
        <SheetHeader className=" text-start border-b -mx-6 px-6 py-4 shadow-sm md:shadow-none">
          <SheetTitle className=" text-base  font-medium ">
          Mavzuni moslashtiruvchi
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100%-50px)] -mx-6 px-6 ">
          <div className=" space-y-12 mt-3">
            <SelectLayout />
            <SelectTheme />
            <ThemeChange />
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default ThemeCustomize;
