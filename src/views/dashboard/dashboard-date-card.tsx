import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent } from '@/components/ui/card'
import { useGetSellerCalendarDateQuery } from '@/features/seller-dashboard/seller-dashboard'
import { useCalendarStore } from '@/store/calendarStore'
import React, { useState } from 'react'
import { DateRange } from "react-day-picker";
import dayjs from "dayjs";
import { Alert, AlertDescription } from '@/components/ui/alert'
import { SellerDashboardItem } from '@/types/seller-dashboard'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatCustomDate } from '@/components/formatters/date-formatter'
import { useAuth } from '@/store'
import { Skeleton } from '@/components/ui/skeleton'


type Props = {
    className?: string
}

const DashboardCommitDate = ({ className = "lg:w-[350px]" }: Props) => {
    const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(
        undefined
    );
    const { user } = useAuth()

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
                start_date: dayjs(range?.from).format('YYYY-MM-DD'),
                end_date: dayjs(range?.to).format('YYYY-MM-DD')
            });
        }
    };



    return (

        <Card>
            <CardContent className="pt-4 px-2 pb-4  rounded-lg lg:mt-0 mt-3  ">
                <Calendar
                    className={` border-b-2  ${className}`}
                    mode="range"
                    selected={selectedRange}
                    onSelect={(range: any) => handleDateClick(range)}
                />
                <h1 className="font-medium sm:text-[16px] px-2  mt-3 mb-2">
                    Yaqin qolgan tadbirlar
                </h1>
                {calendarLoading && (
                    <div className="flex gap-2 flex-col ">
                        <Skeleton className='h-14 w-full' />
                        <Skeleton className='h-14 w-full' />
                        <Skeleton className='h-14 w-full' />
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
                    <Alert
                        className="w-full "
                        variant={"outline"}
                        color="destructive"
                    >
                        <AlertDescription className="w-full text-center">
                            Status: {(errorCalendar as any)?.originalStatus}, Xatolik yuz
                            berdi
                        </AlertDescription>
                    </Alert>
                )}
                <div className={`overflow-y-auto ${user?.role==="admin" ? "max-h-40" : "max-h-28"}`}>


                    {calendarSuccess &&
                        calendarData?.results.map(
                            (item: SellerDashboardItem, index: number) => (
                                <div key={index} className="cursor-pointer hover:bg-default-100 flex justify-between items-center gap-7 sm:gap-4 w-full p-2    rounded-lg">
                                    <div className="flex justify-between items-center gap-3 w-full">
                                        <div className="relative inline-block">
                                            <Avatar>
                                                <AvatarImage src={item?.seller.image} />
                                                <AvatarFallback>
                                                    {item?.seller.full_name?.slice(0, 2)?.toUpperCase()}
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

                </div>
            </CardContent>
        </Card>

    )
}

export default DashboardCommitDate