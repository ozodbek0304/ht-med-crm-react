"use client"

import { User, Application, DashBoard } from "@/components/svg";
import  { useEffect } from "react";
import DashboardCard from "../dashboard-card";
import CustomerPage from "../../customer/customers/customer-page";
import { useGetSellerDashboradQuery } from "@/features/seller-dashboard/seller-dashboard";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { addPeriodToThousands } from "@/components/formatters/price-formatter";
import UserDeviceReport from "@/components/chart/basic-donut";
import { formatPhoneNumber } from "@/components/formatters/phone-formatter";
import { useGetItemsProfileQuery } from "@/features/profile/profile";

import DashboardCommitDate from "../dashboard-date-card";
import { useProfileDate } from "@/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";




const SellerDashboard = () => {
  const { setProfileData, profileData } = useProfileDate();
  const { data: sellerData, isSuccess: sellerSuccess, isError: sellerError, error: errorSeller, isLoading: sellerLoading } = useGetSellerDashboradQuery();

  const { data: sellerProfile, isSuccess: sellerSuccessProfile, isError: profileError, error: errorProfile, isLoading: profileLoading } = useGetItemsProfileQuery();

  const data2 = [
    {
      text: "Aktiv Xaridorlar",
      total: sellerData?.active_customers_count && addPeriodToThousands(sellerData?.active_customers_count),
      color: "primary",
      icon: <User className="w-6 h-6 text-indigo-200" />
    },
    {
      text: "Jarayondagilar",
      total: sellerData?.in_progress_customers_count && addPeriodToThousands(sellerData?.in_progress_customers_count),
      color: "warning",
      icon: <Application className="w-6 h-6 text-orange-100" />
    },
    {
      text: "Umumiy baza",
      total: sellerData?.in_base_customers_count && addPeriodToThousands(sellerData?.in_base_customers_count),
      color: "success",
      icon: <DashBoard className="w-6 h-6 text-green-200" />
    }
  ];

  useEffect(() => {
    if (sellerSuccessProfile && sellerProfile?.full_name) {
      setProfileData(sellerProfile)
    }
  }, [sellerProfile]);




  return <div className="flex flex-col gap-4">
    <Card>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {
            sellerLoading &&
            (
              Array(3).fill(0).map((_, index: number) => (
                <Card key={index}>
                  <CardContent className="p-0">
                    <div className="w-full h-[152px] overflow-hidden rounded-t-md">
                      <Skeleton className="w-full h-full" />
                    </div>
                  </CardContent>
                </Card>
              ))
            )
          }

          {sellerSuccess && <DashboardCard data={data2} />}
        </div>
        {
          sellerSuccess && sellerData.active_customers_count > 0 && (
            <Alert className="w-full  lg:w-[350px]  " variant={"outline"} color="warning">
              <AlertDescription className="w-full text-center">Ma'lumot topilmadi</AlertDescription>
            </Alert>
          )
        }

        {sellerError && <Alert className="w-full   " variant={"outline"} color="destructive">
          <AlertDescription className="w-full  text-center">Status: {(errorSeller as any)?.originalStatus}, Xatolik yuz berdi</AlertDescription>
        </Alert>}

      </CardContent>
    </Card>

    <CardContent className="p-0" >
      <div className="sm:flex sm:justify-between sm:gap-3">
        {sellerSuccess &&
          <div className="relative h-[200px] lg:h-[250px] mb-3 sm:m-0 w-full bg-white dark:bg-slate-800 rounded-lg"
          >

            <div className="w-[92%] flex items-center gap-4 absolute top-[50%] sm:left-10 left-5 translate-y-[-50%]">
              <div>
                <Avatar className="rounded-full h-36 w-36 ">
                  <AvatarImage src={profileData?.image} alt="customer" />
                  <AvatarFallback className="rounded uppercase bg-primary/30 text-primary text-3xl">
                    {profileData?.full_name?.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex justify-between w-[75%] items-center">
                <div>
                  <div className="text-xl lg:text-2xl font-semibold  mb-1">{profileData?.full_name}</div>
                  <div className="text-xs  font-medium  pb-1.5">Lead Sales Manager</div>
                  <div className="text-xs lg:text-sm font-medium  pb-1.5">{formatPhoneNumber(profileData?.phone)}</div>
                </div>
                <div className="w-52">
                  <UserDeviceReport data={sellerSuccessProfile ? profileData?.seller_coins : []} />
                </div>
              </div>
            </div>

          </div>
        }
        {
          sellerSuccessProfile && profileData?.phone === null && (
            <Alert className="w-[92%]  " variant={"outline"} color="warning">
              <AlertDescription className="w-full text-center">Ma'lumot topilmadi</AlertDescription>
            </Alert>
          )
        }

        {profileError && <Alert className="w-[92%] " variant={"outline"} color="destructive">
          <AlertDescription className="w-full  text-center">Status: {(errorProfile as any)?.originalStatus}, Xatolik yuz berdi</AlertDescription>
        </Alert>}
        {
          profileLoading && <Skeleton className=" h-[200px] lg:h-[250px] mb-3 sm:m-0 w-full" />
        }

        <DashboardCommitDate className="lg:w-[500px]" />

      </div>


    </CardContent>

    <CustomerPage card={"none"} />

  </div>

};

export default SellerDashboard;