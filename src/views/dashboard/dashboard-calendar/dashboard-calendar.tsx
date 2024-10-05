import { Alert, AlertDescription } from "../../../components/ui/alert";
import { Card, CardContent } from "../../../components/ui/card";
import { Skeleton } from "../../../components/ui/skeleton";
import { useGetSellerCalendarDateQuery } from "../../../features/seller-dashboard/seller-dashboard";
import { useCalendarStore } from "../../../store/calendarStore";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import dayjs from "dayjs";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { formatCustomDate } from "../../../components/formatters/date-formatter";
import { Calendar } from "../../../components/ui/calendar";
import { SellerDashboardItem } from "../../../interfaces/seller-dashboard";

const DashBoardCalendar = () => {
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(
    undefined
  );
  const {
    queryParam: calendarQueryParam,
    setQueryParam: setCalendarQueryParam,
  } = useCalendarStore();
  const queryStrCalendar = new URLSearchParams(
    calendarQueryParam as Record<string, string>
  ).toString();
  const {
    data: calendarData,
    isSuccess: calendarSuccess,
    isError: calendarError,
    error: errorCalendar,
    isLoading: calendarLoading,
  } = useGetSellerCalendarDateQuery(queryStrCalendar);
  const handleDateClick = (range: DateRange) => {
    setSelectedRange(range);

    if (range?.from && range?.to) {
      setCalendarQueryParam({
        start_date: dayjs(range?.from).format("YYYY-MM-DD"),
        end_date: dayjs(range?.to).format("YYYY-MM-DD"),
      });
    }
  };

  return (
    <Card>
      <CardContent className="pt-4 px-2 pb-4 bg-white dark:bg-slate-800 rounded-lg lg:mt-0 mt-3 ">
        <Calendar
          className="lg:w-[350px] border-b-2 "
          mode="range"
          selected={selectedRange}
          onSelect={(range: any) => handleDateClick(range)}
        />
        <h1 className="font-medium sm:text-[16px] px-2  mt-3 mb-2">
          Yaqin qolgan tadbirlar
        </h1>
        {calendarLoading && (
          <div className="flex items-center flex-col gap-2 justify-center">
            <Skeleton className="w-full h-14" />
            <Skeleton className="w-full h-14" />
          </div>
        )}
        {calendarSuccess && calendarData?.count == 0 && (
          <Alert className="w-full " variant={"outline"} color="warning">
            <AlertDescription className="w-full text-center">
              Ma'lumot topilmadi
            </AlertDescription>
          </Alert>
        )}
        {calendarError && (
          <Alert className="w-full " variant={"outline"} color="destructive">
            <AlertDescription className="w-full text-center">
              Status: {(errorCalendar as any)?.originalStatus}, Xatolik yuz
              berdi
            </AlertDescription>
          </Alert>
        )}
        {calendarSuccess &&
          calendarData?.results.map(
            (item: SellerDashboardItem, index: number) => (
              <div
                key={index}
                className="flex justify-between items-center gap-7 sm:gap-4 w-full p-2   hover:bg-default-50 rounded-lg"
              >
                <div className="flex justify-between items-center gap-3 w-full">
                  <div className="relative inline-block">
                    <Avatar>
                      <AvatarImage src={item?.seller.image} />
                      <AvatarFallback>
                        {item?.seller.full_name
                          ?.slice(0, 2)
                          ?.toLocaleUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="w-full">
                    <div className="flex w-full justify-between">
                      <div className="text-sm font-medium text-default-800 mb-1 whitespace-nowrap">
                        {item.seller.full_name}
                      </div>
                      <div className="text-[11px] font-medium text-default-800 mb-1 whitespace-nowrap">
                        {formatCustomDate(item.created_at)}
                      </div>
                    </div>
                    <div className="text-xs text-default-600 whitespace-nowrap">
                      Buxorodagi klinikadan mijozlar keladi
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
      </CardContent>
    </Card>
  );
};

export default DashBoardCalendar;
