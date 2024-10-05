import { cn } from "../../lib/utils";
import shortImage from "../../assets/short-image-2.png";
import { Card, CardContent } from "../../components/ui/card";
import { useGetNotificationItemsQuery } from "../../features/notifications/notifications";
import { Alert, AlertDescription } from "../../components/ui/alert";
import SkeletonPage from "../../components/skeleton/skeleton-page";
import PaginationPage from "../../components/pagination/page";
import { useState } from "react";
import { useNotificationStore } from "../../store/notificationStore";
import { formatCustomDate } from "../../components/formatters/date-formatter";

const NotificationMessageDetail = () => {
  const { queryParam, setQueryParam } = useNotificationStore();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const queryStr = new URLSearchParams({
    ...(queryParam as Record<string, string>),
  }).toString();

  const { data, isLoading, isSuccess, isError, error } =
    useGetNotificationItemsQuery(queryStr);
  const pageCount = data?.count ? Math.round(Number(data.count) / 10) : 1;

  const handleNext = () => {
    if (currentPage < pageCount) {
      setCurrentPage(currentPage + 1);
      setQueryParam({ page: currentPage + 1 });
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setQueryParam({ page: currentPage - 1 });
    }
  };

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setQueryParam({ page: pageNumber });
  };

  return (
    <>
      <div
        style={{ backgroundImage: `url(${shortImage})` }}
        className="w-full h-full bg-cover bg-no-repeat p-4 flex items-center justify-center"
      >
        <span className="text-base font-semibold text-white text-center">
          Bildirishnomalar
        </span>
      </div>
      {isLoading ? (
        <Card>
          <CardContent className="pt-4 space-y-5">
            {Array(9)
              .fill(0)
              .map((_, index: number) => (
                <SkeletonPage key={index} />
              ))}
          </CardContent>
        </Card>
      ) : isSuccess ? (
        data.results.length > 0 ? (
          data?.results.map((item, index) => (
            <Card>
              <CardContent className="p-0">
                <div className="flex justify-between border-b-2 p-2  dark:hover:bg-slate-600 hover:bg-slate-200 hover:rounded">
                  <div className="w-[60%]">
                    <p className="text-[16px] mb-2 font-medium text-default-900">
                      {item.seller.full_name}
                    </p>
                    <span className="mb-2">{item.text}</span>
                  </div>
                  <div className="flex items-center gap-5">
                    <div>
                      <span>{formatCustomDate(item.seller.created_at)}</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <div
                        className={cn("w-4 h-4 rounded-full", {
                          "bg-primary": !item.is_read,
                          "bg-gray-300": item.is_read,
                        })}
                      ></div>
                    </div>
                  </div>
                </div>
                {pageCount > 1 && (
                  <PaginationPage
                    handleNext={handleNext}
                    handlePrevious={handlePrevious}
                    currentPage={currentPage}
                    totalPages={pageCount}
                    handlePageClick={handlePageClick}
                  />
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="p-5">
            <Alert className="w-full" variant={"outline"} color="warning">
              <AlertDescription className="w-full text-center">
                Ma'lumot topilmadi
              </AlertDescription>
            </Alert>
          </Card>
        )
      ) : (
        isError && (
          <Card className="p-5">
            <Alert className="w-full " variant={"outline"} color="destructive">
              <AlertDescription className="w-full text-center">
                Status: {(error as any)?.originalStatus}, Xatolik yuz berdi
              </AlertDescription>
            </Alert>
          </Card>
        )
      )}
    </>
  );
};

export default NotificationMessageDetail;
