import { Icon } from "@iconify/react";
import { cn, isLocationMatch, getDynamicPath } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Link } from "react-router-dom";
import * as Tooltip from "@radix-ui/react-tooltip";

const SingleMenuItem = ({ item, collapsed }: {
  item: any;
  collapsed: boolean;
}) => {
  const {  href, title } = item;


  const pathname = usePathname();
  const locationName = getDynamicPath(pathname);

  return (
    <Link to={href}>
      <>
        {collapsed ? (
          <div>
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <span
                    className={cn(
                      "h-12 w-12 mx-auto rounded-md  transition-all duration-300 inline-flex flex-col items-center justify-center  relative  ",
                      {
                        "bg-primary text-primary-foreground data-[state=delayed-open]:bg-primary":
                          isLocationMatch(href, locationName),
                        " text-default-600 data-[state=delayed-open]:bg-primary-100 data-[state=delayed-open]:text-primary ":
                          !isLocationMatch(href, locationName),
                      }
                    )}
                  >
                    <Icon icon={item.icon} className="h-6 w-6 text-default-700" />
                  </span>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    side="right"
                    className="bg-primary  text-primary-foreground data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-violet11 select-none rounded-[4px]  px-[15px] py-[10px] text-[15px] leading-none  shadow-sm will-change-[transform,opacity]"
                    sideOffset={5}
                  >
                    {title}
                    <Tooltip.Arrow className="fill-primary" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
          </div>
        ) : (
          <div
            className={cn(
              "flex gap-3  text-default-700 text-sm capitalize px-[10px] font-medium py-3 rounded cursor-pointer hover:bg-primary hover:text-primary-foreground",
              {
                "bg-primary text-primary-foreground": isLocationMatch(
                  href,
                  locationName
                ),
              }
            )}
          >
            <span className="flex-grow-0"> 
              <Icon icon={item.icon} className="h-5 w-5 text-default-700" />
            </span>
            <div className="text-box flex-grow ">{title}</div>
          </div>
        )}
      </>
    </Link>
  );
};

export default SingleMenuItem;
