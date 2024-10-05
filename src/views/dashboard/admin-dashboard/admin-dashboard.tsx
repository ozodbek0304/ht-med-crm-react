"use client";

import { Card, CardContent } from "@/components/ui/card";
import DashboardCard from "../dashboard-card";
import LineColumn from "@/components/chart/line-chart";
import { useGetItemsQuery } from "@/features/seller/seller";
import { Alert, AlertDescription } from "@/components/ui/alert";
import SettingsSkeleton from "../../settings/components/skeleton";
import { useGetItemsSellerDashboardQuery } from "@/features/admin-dashboard/admin-dashboard";
import { Skeleton } from "@/components/ui/skeleton";
import { addPeriodToThousands } from "@/components/formatters/price-formatter";
import TopSellerComments from "./commints";
import TopSeller from "./top-seller";
import DashboardCommitDate from "../dashboard-date-card";
import { CommentType } from "@/interfaces/commit-page";
import { SellerResults } from "@/interfaces/seller-page";
import { useGetCommentsQuery } from "@/features/comments/comment";
import { Application, Spam, User } from "@/svg";
const AdminDashboard = () => {


  const {
    data: sellerData,
    isError: sellerError,
    isSuccess: sellerSuccess,
    error: errorSeller,
    isLoading: sellerLoading,
  } = useGetItemsQuery("");


  const {
    data: adminData,
    isSuccess: adminSuccess,
    isError: adminError,
    error: errorAdmin,
    isLoading: adminLoading,
  } = useGetItemsSellerDashboardQuery();

  const {
    data: commentData,
    isSuccess: commentSuccess,
    isLoading: commentLoading,
    isError: commentError,
    error: errorComment,
  } = useGetCommentsQuery("");



  const data2 = [
    {
      text: "Sotuvlar soni",
      total:
        adminData?.sold_count && addPeriodToThousands(adminData?.sold_count),
      color: "success",
      icon: <User className="w-6 h-6 text-indigo-200" />,
    },
    {
      text: "Aktiv xaridorlar",
      total:
        adminData?.active_customers_count &&
        addPeriodToThousands(adminData?.active_customers_count),
      color: "primary",
      icon: <User className="w-6 h-6 text-indigo-200" />,
    },
    {
      text: "Jarayondagi xaridorlar",
      total:
        adminData?.in_progress_customers_count &&
        addPeriodToThousands(adminData?.in_progress_customers_count),
      color: "warning",
      icon: <Application className="w-6 h-6 text-orange-100" />,
    },
    {
      text: "So'rovlar",
      total:
        adminData?.requests_count &&
        addPeriodToThousands(adminData?.requests_count),
      color: "destructive",
      icon: <Spam className="w-3.5 h-3.5" />,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
            {adminLoading &&
              Array(4)
                .fill(0)
                .map((_, index: number) => (
                  <Card key={index}>
                    <CardContent className="p-0">
                      <div className="w-full h-[152px] overflow-hidden rounded-t-md">
                        <Skeleton className="w-full h-full" />
                      </div>
                    </CardContent>
                  </Card>
                ))}

            {adminSuccess && <DashboardCard data={data2} />}
          </div>
          {adminSuccess && adminData.active_customers_count > 0 && (
            <Alert
              className="w-full  lg:w-[350px]  "
              variant={"outline"}
              color="warning"
            >
              <AlertDescription className="w-full text-center">
                Ma'lumot topilmadi
              </AlertDescription>
            </Alert>
          )}

          {adminError && (
            <Alert
              className="w-full   "
              variant={"outline"}
              color="destructive"
            >
              <AlertDescription className="w-full  text-center">
                Status: {(errorAdmin as any)?.originalStatus}, Xatolik yuz berdi
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <div className="lg:flex gap-3 sm:items-start ">
        <Card className="w-full  rounded-lg">
          <CardContent className="p-0">
            <LineColumn text="Summasi" />
          </CardContent>
        </Card>

        <DashboardCommitDate />

      </div>


      <div className="lg:flex gap-3 md:items-start ">
        <Card className="w-full">
          <CardContent className="p-4 pb-4   rounded-lg w-full">
            <h1 className="p-2 mb-2 sm:text-[18px] font-medium border-b-2">
              So'ngi izohlar
            </h1>
            {commentLoading && (
              <div className="flex items-center  flex-col gap-2 justify-center">
                <Skeleton className="w-full h-14" />
                <Skeleton className="w-full h-14" />
              </div>
            )}
            {commentSuccess && commentData.count == 0 && (
              <Alert
                className="w-full  lg:w-[350px]  "
                variant={"outline"}
                color="warning"
              >
                <AlertDescription className="w-full text-center">
                  Ma'lumot topilmadi
                </AlertDescription>
              </Alert>
            )}
            {commentError && (
              <Alert
                className="w-full   "
                variant={"outline"}
                color="destructive"
              >
                <AlertDescription className="w-full  text-center">
                  Status: {(errorComment as any)?.originalStatus}, Xatolik yuz
                  berdi
                </AlertDescription>
              </Alert>
            )}
            {commentSuccess &&
              commentData?.results.map((item: CommentType, index: number) => (
                <div className="mb-7" key={item.id}>
                  <TopSellerComments
                    key={`customer-${item.id}`}
                    item={item}
                    index={index + 3}
                  />
                </div>
              ))}
          </CardContent>
        </Card>


        <Card>
          <CardContent className="pt-4 px-2 pb-4  rounded-lg  ">
            <h1 className="p-2 mb-2 sm:text-[18px] font-medium border-b-2">
              Top Sotuvchilar
            </h1>

            {sellerLoading && (
              <div className="flex justify-between items-center gap-7 sm:gap-4 w-full  lg:w-[350px]  hover:bg-default-50 rounded-lg">
                <SettingsSkeleton />
              </div>
            )}

            {sellerSuccess &&
              sellerData?.results?.map((item: SellerResults) => (
                <TopSeller
                  key={item.id}
                  id={item.id}
                  image={item?.image}
                  phone={item.phone}
                  full_name={item.full_name}
                  seller_coins={item?.seller_coins}
                />
              ))}

            {sellerSuccess && sellerData?.count == 0 && (
              <Alert
                className="w-full  lg:w-[350px]  "
                variant={"outline"}
                color="warning"
              >
                <AlertDescription className="w-full text-center">
                  Ma'lumot topilmadi
                </AlertDescription>
              </Alert>
            )}

            {sellerError && (
              <Alert
                className="w-full  lg:w-[350px]  "
                variant={"outline"}
                color="destructive"
              >
                <AlertDescription className="w-full  text-center">
                  Status: {(errorSeller as any)?.originalStatus}, Xatolik yuz
                  berdi
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>


    </div>
  );
};

export default AdminDashboard;
