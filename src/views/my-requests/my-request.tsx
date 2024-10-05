import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

import { Skeleton } from "@/components/ui/skeleton";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";
import DeleteConfirmationDialog from "@/components/modals/delete-confirmation-dialog";
import { useGetSellerRequestsQuery, useUpdateSellerRequestMutation } from "@/features/selller-request/seller-request";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { formatCustomDate } from "@/components/formatters/date-formatter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PaginationPage from "@/components/pagination/page";

interface roleData {
  role: string;
}

const MyRequests = ({ role }: roleData) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [admin_response, setAdminRespons] = useState("");
  const { data: dataSellerReq, isSuccess: isSuccessReq, isLoading: isLoadingReq, error: errorReq } = useGetSellerRequestsQuery(currentPage);
  const [status, setStatus] = useState<string>('');
  const [statusText, setStatusText] = useState({ title: "", description: "", acceptBtnTitle: "", acceptBtnTitleColor: "", toast: "" });

  const [
    updateItem,
    {
      isLoading: updateLoading,
      isError,
      error: updateError,
      isSuccess: updateSuccess,
    },
  ] = useUpdateSellerRequestMutation();

  const closeDialog = () => {
    setIsOpen(false);
    setAdminRespons("");
  };

  const onConfirm = async (id: number) => {
    if (id) {
      if (status == "archived" || status == "accepted") {
        await updateItem({
          id: String(id),
          status: status,
        }).unwrap();
      } else {
        await updateItem({
          id: String(id),
          status: status,
          admin_response: admin_response,
        }).unwrap();
      }
    }
  };


  const hanldeClick = (id: number, status: string) => {
    if (status && id) {
      if (status == "rejected") {
        setStatusText({
          title: role == "admin" ? "So'rovni bekor qilishga rozimisiz?" : "So'rovni  qaytarishga  rozimisiz?",
          description: role == "admin" ? "Siz haqiqatdan so'rovni bekor qilmoqchimisiz?" : "Siz bu so'rovni qaytarmoqchimisiz?",
          acceptBtnTitle: role == "admin" ? "So'rovni bekor qilish" : "So'rovni qaytarish",
          acceptBtnTitleColor: "destructive",
          toast: role == "admin" ? "So'rov bekor qilindi" : "So'rovingiz qaytarildi",
        })
      } else if (status == "archived") {
        setStatusText({
          title: "So'rovni o'chirishga rozimisiz?",
          description: "Siz haqiqatdan ham shu ma'lumotni o'chirmoqchimisiz?",
          acceptBtnTitle: "O'chirish",
          acceptBtnTitleColor: "destructive",
          toast: "Muvaffaqiyatli o'chirildi"
        })
      } else if (status == "accepted") {
        setStatusText({
          title: "So'rovni qabul qilishga rozimisiz?",
          description: "Siz bu so'rovni qabul qilmoqchimisiz?",
          acceptBtnTitle: "Qabul qilish",
          acceptBtnTitleColor: "success",
          toast: "Muvaffaqiyatli qabul qilindi"
        })
      } else {
        toast.error("Xatolik yuz berdi")
      }
      setStatus(status);
      setIsOpen(true);

    }
  };

  useEffect(() => {
    if (updateSuccess) {
      toast.success(statusText?.toast);
      setIsOpen(false);
      setAdminRespons("");
    }
  }, [updateSuccess]);


  useEffect(() => {
    if (isError) {
      const backendErrors = (updateError as any).status as Record<string, string>;
      toast.error("Status:" + backendErrors.status + " Xatolik yuz berdi")
    }
  }, [isError])

  const pageCount = dataSellerReq?.count ? Math.round(Number(dataSellerReq.count) / 10) : 1;

  const handleNext = () => {
    if (currentPage < pageCount) {
      setCurrentPage(currentPage + 1);

    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };



  return (
    <Card>
      <CardHeader className="flex-row border-none mb-2">
        <div className="flex-1">
          {isLoadingReq ? <Skeleton className="w-56	h-7" /> : <div className="text-xl font-medium tex-default-900">
            {role == "admin" ? `So'rovlar (${dataSellerReq?.count})` : `Mening so'rovlarim (${dataSellerReq?.count})`}
          </div>}
        </div>
      </CardHeader>
      <CardContent>
        {isLoadingReq ? (
          Array(10).fill(0).map((_, index) => (
            <>
              <Skeleton key={index} className="h-[100px] w-full mb-4 rounded-md  md:mr-3 md:mb-0" />

              <div className="md:mt-3 mt-0 w-full">
                <Skeleton className="w-1/12	h-2 mb-2" />

                <Skeleton className="w-full	h-4 mb-3" />
                <Skeleton className="w-full	h-2 mb-2" />
                <Skeleton className="w-3/4	h-2 mb-4" />
              </div>
            </>
          ))
        ) : (
          <div className="space-y-5 mt-3">
            {isSuccessReq ? (
              dataSellerReq.results && dataSellerReq?.results?.length > 0 ? (
                dataSellerReq.results.map((item, index) => (
                  <div
                    className="flex justify-between items-center gap-4 pl-4 relative before:absolute before:top-0 before:left-0 before:h-full before:w-1 before:bg-default-200"
                    key={`works-note-${index}`}
                  >
                    <div className=" border-b-2 w-full cursor-pointer dark:hover:bg-slate-700 hover:bg-slate-100 pb-2 space-y-3 hover:rounded-lg hover:shadow-md ">
                      {role === "admin" && <div className="flex items-center justify-between p-2 bg-default-200 rounded-lg ">
                        <div className="flex gap-2 items-center">
                          <p>#{item.id}</p>
                          <Avatar className="w-9 h-9 rounded-full">
                            <AvatarImage src={item?.seller?.image} alt="customer" />
                            <AvatarFallback className="rounded uppercase bg-primary/30 text-primary ">
                              {item?.seller?.full_name?.slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <h4>{item?.seller?.full_name}</h4>
                        </div>
                        <div className="flex items-center">
                          <div className="font-medium text-default-600  text-sm">
                            {item?.type}
                          </div>
                          <Icon
                            onClick={() =>
                              hanldeClick(item?.id, "archived")
                            }
                            className="h-6 w-6 text-red-500"
                            icon="material-symbols:delete"
                          />
                        </div>
                      </div>}


                      {role === "seller" && <div className="grid grid-cols-2 items-center bg-default-200 rounded-md p-2">
                        <div className="flex gap-2 items-center font-medium text-default-800  text-[16px]">
                          <p>#{item.id}</p>
                          <p>{item?.type}</p>
                        </div>
                        <div className={"w-full flex justify-end gap-3 items-center"}>
                          <Icon
                            onClick={() =>
                              hanldeClick(item.id, "archived")
                            }
                            className="h-6 w-6 text-red-500"
                            icon="material-symbols:delete"
                          />

                        </div>
                      </div>}


                      <div className="text-[14px] text-default-600 mt-2 px-2">
                        {item.text}
                      </div>
                      <div className={`sm:flex gap-3 sm:justify-between items-center px-2`}>
                        <div className="text-default-500 mb-3 sm:m-0 text-[12px]">
                          {
                            formatCustomDate(item?.created_at)
                          }
                        </div>
                        <div className="flex gap-3 items-center">
                          <Button
                            onClick={() =>
                              hanldeClick(item.id, "rejected")
                            }
                            color="destructive"
                            className="text-[12px] h-8"
                          >
                            {role === "admin"
                              ? "So'rovni bekor qilish"
                              : "So'rovni qaytarish"}
                          </Button>


                          {role === "admin" && <Button
                            color="success"
                            onClick={() =>
                              hanldeClick(item.id, "accepted")
                            }
                            className="text-[12px] h-8"
                          >
                            Qabul qilish
                          </Button>}
                        </div>

                      </div>

                      <DeleteConfirmationDialog
                        isPending={updateLoading}
                        open={isOpen}
                        onClose={closeDialog}
                        onConfirm={() => onConfirm(item.id)}
                        title={statusText?.title}
                        description={statusText?.description}
                        deleteBtnTitle={statusText?.acceptBtnTitle}
                        acceptBtnTitle="Yopish"
                        deleteBtnTitleColor="secondary"
                        acceptBtnTitleColor={statusText?.acceptBtnTitleColor}

                        childer={(status == "archived" || status == "accepted") ? "" :
                          <div className="flex flex-col gap-1">
                            <Input
                              onChange={(e) => setAdminRespons(e.target.value)}
                              placeholder="Sabab"
                            />
                          </div>
                        }
                        disabled={(status == "archived" || status == "accepted") ? false : admin_response?.trim() === ""}
                      />

                    </div>
                  </div>
                ))
              ) : (
                <Alert className="w-full " variant={"outline"} color="warning">
                  <AlertDescription className="w-full text-center">Ma'lumot topilmadi</AlertDescription>
                </Alert>
              )
            ) : (
              <Alert className="w-full " variant={"outline"} color="destructive">
                <AlertDescription className="w-full text-center">
                  Status: {(errorReq as any)?.originalStatus}, Xatolik yuz berdi
                </AlertDescription>
              </Alert>
            )}

            {pageCount > 1 && <PaginationPage
              handleNext={handleNext}
              handlePrevious={handlePrevious}
              currentPage={currentPage}
              totalPages={pageCount}
              handlePageClick={handlePageClick}
            />}


          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MyRequests;
