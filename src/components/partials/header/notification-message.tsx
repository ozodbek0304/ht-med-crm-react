import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { ScrollArea } from "../../ui/scroll-area";
import shortImage from "../../../assets/short-image-2.png";
import { Alert, AlertDescription } from "../../ui/alert";

import { formatCustomDate } from "../../formatters/date-formatter";
import { Link } from "react-router-dom";
import { useGetNotificationItemsQuery } from "../../../features/notifications/notifications";
import { Bell } from "../../../svg";
import { cn } from "../../../lib/utils";

const NotificationLists = () => {
  const { data, isSuccess } = useGetNotificationItemsQuery('')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative md:h-9 md:w-9 h-8 w-8 hover:bg-default-100 dark:hover:bg-default-200 
          data-[state=open]:bg-default-100  dark:data-[state=open]:bg-default-200 
           hover:text-primary text-default-500 dark:text-default-800  rounded-full  "
        >
          <Bell className="h-5 w-5 " />
          <Badge className=" w-4 h-4 p-0 text-xs  font-medium  items-center justify-center absolute left-[calc(100%-18px)] bottom-[calc(100%-16px)] ring-2 ring-primary-foreground">
            {data?.count}
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="z-[999] mx-4 lg:w-[412px] p-0"
      >
        <DropdownMenuLabel
          style={{ backgroundImage: `url(${shortImage})` }}
          className="w-full h-full bg-cover bg-no-repeat p-4 flex items-center justify-center"
        >
          <span className="text-base font-semibold text-white text-center">
            Bildirishnomalar
          </span>

        </DropdownMenuLabel>
        <div className="xl:max-h-[350px]">
          <ScrollArea className="h-full">
            {isSuccess && data?.count > 0 ? data?.results.map((item: any, index: number) => (
              <DropdownMenuItem
                key={`inbox-${index}`}
                className="flex m-2 items-end gap-9 py-2 px-4 cursor-pointer dark:hover:bg-background"
              >
                <div className="flex-1 flex items-center gap-2">
                  <div>
                    <div className="text-sm font-medium text-default-900 mb-[2px] whitespace-nowrap">
                      {item.seller.full_name}
                    </div>
                    <div className="text-xs text-default-900 truncate max-w-[100px] lg:max-w-[185px]">
                      {" "}
                      {item.text}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "text-xs font-medium text-default-900 whitespace-nowrap",
                      {
                        "text-default-600": item.title,
                      }
                    )}
                  >
                    {formatCustomDate(item.seller.created_at)}
                  </div>
                  <div
                    className={cn("w-2 h-2 rounded-full", {
                      "bg-primary": !item.is_read,
                      "bg-gray-300": item.is_read,
                    })}
                  ></div>
                </div>
              </DropdownMenuItem>
            )) : <Alert className="w-full m-3" variant={"outline"} color="warning">
              <AlertDescription className="w-full text-center">
                Ma'lumot topilmadi
              </AlertDescription>
            </Alert>}
          </ScrollArea>
        </div>
        {isSuccess && data?.count > 10 &&
          <>
            <DropdownMenuSeparator />
            <div className="m-4 mt-5">
              <Button asChild className="w-full">
                <Link to="/notifications">Barchasini ko'rish</Link>
              </Button>
            </div>
          </>
        }

      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationLists;
