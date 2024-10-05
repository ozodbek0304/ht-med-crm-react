import { Icon } from "@iconify/react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import DeleteConfirmationDialog from "@/components/modals/delete-confirmation-dialog";
import { formatCustomDate } from "@/components/formatters/date-formatter";
import { useDeleteItemMutation, useUpdateItemMutation } from "@/features/comments/comment";
import toast from "react-hot-toast";
import parse from 'html-react-parser';
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CommentType } from "@/interfaces/commit-page";



interface Props {
  data: CommentType;
  setPropValue: (value: any) => void;
}

const CommentSection = ({ data, setPropValue }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<any>(null);
  const [admin_response, setAdminRespons] = useState("");
  const [deleteItem, { isSuccess: deleteSuccess, isError: deleteIsError, error: deleteError, isLoading: deletIsloading }] = useDeleteItemMutation();
  const [updateItem, { isSuccess: updateSuccess, isError: updateError, error: errorUpdates, isLoading: updateIsloading }] = useUpdateItemMutation()

  const closeDialog = () => {
    setIsOpen(false);
  };

  const onConfirm = async () => {
    if (deleteId) {
      if (data?.audio !== null) {
        await updateItem({ id: deleteId, changes: admin_response as any })
      } else {
        await deleteItem(deleteId).unwrap();
      }
    }
  };

  useEffect(() => {
    if (deleteSuccess) {
      toast.success("Xabar o‘chirildi")
      setIsOpen(false);
      setDeleteId(null);
      setDeleteId(null)
    }
  }, [deleteSuccess]);

  useEffect(() => {
    if (deleteIsError) {
      const backendErrors = ((deleteError as any).originalStatus || (deleteError as any).status) as Record<string, string>
      toast.error("Status:" + backendErrors + ' ' + ((deleteError as any)?.data?.detail || "Xatolik yuz berdi"))
    }
  }, [deleteIsError]);


  useEffect(() => {
    if (updateSuccess) {
      toast.success("Xabar o‘chir haqida so'rovingiz qabul qilindi");
      setAdminRespons("")
    }
  }, [updateSuccess]);

  useEffect(() => {
    if (updateError) {
      const backendErrors = ((errorUpdates as any).originalStatus || (errorUpdates as any).status) as Record<string, string>
      toast.error("Status:" + backendErrors + ' ' + ((errorUpdates as any)?.data?.detail || "Xatolik yuz berdi"))
    }
  }, [updateError]);



  

  return (
    <>
      <div className="flex flex-col overflow-y-auto m-0 mt-2 ">
        <div className="">
          <ScrollArea className="">
            <div className="block md:px-6 px-4 mb-2 ">
              <div className="flex gap-x-2 items-center group  ">
                <div className="flex-none self-end -translate-y-5">


                  <Avatar className="rounded-full h-9 w-9">
                    <AvatarImage src={data?.seller?.image} alt="customer" />
                    <AvatarFallback className="rounded uppercase bg-primary/30 text-primary">
                      {data.seller?.full_name?.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>

                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex flex-col   gap-1">
                    <div className="flex items-center gap-1">

                      <div className="whitespace-pre-wrap break-all relative z-[0]">
                        {
                          data?.audio ?

                            <audio src={data?.audio} controls className="h-[36px] " ></audio>

                            :
                            <div className="bg-default-100  text-sm p-2 rounded-2xl  flex-1  ">
                              {data.text ? parse(data.text) : null}
                            </div>
                        }
                      </div>
                      <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible cursor-pointer ">
                        <DropdownMenu onOpenChange={() => setDeleteId(data?.id)}>
                          <DropdownMenuTrigger asChild>
                            <span className="w-7 h-7 rounded-full bg-default-200 flex items-center justify-center">
                              <Icon
                                icon="bi:three-dots-vertical"
                                className="text-lg"
                              />
                            </span>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            className="w-20 p-0 "
                            align="center"
                            side="top"
                          >
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={() => setIsOpen(true)}
                            >
                              O'chirish
                            </DropdownMenuItem>

                            {data?.audio === null && <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={() => setPropValue(data)}
                            >
                              Tahrirlash
                            </DropdownMenuItem>}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <span className="text-xs   text-default-500">
                      {formatCustomDate(data.created_at)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>


      <DeleteConfirmationDialog
        open={isOpen}
        onClose={closeDialog}
        onConfirm={onConfirm}
        title={data?.audio !== null ? "Xabarni o'chirish uchun sabab yozing" : "Xabarni o'chirishga rozimisiz?"}
        description={data?.audio !== null ? "Siz haqiqatdan ham xabarni o'chirish uchun xabar yozmoqchimisiz" : "Siz haqiqatdan ham xabarni o'chirmoqchimisiz?"}
        deleteBtnTitle={data?.audio !== null ? "Yuborish" : "O'chirish"}
        acceptBtnTitle="Yopish"
        acceptBtnTitleColor={data?.audio !== null ? "success" : "destructive"}
        deleteBtnTitleColor="secondary"
        childer={
          data?.audio !== null ? <div className="flex flex-col gap-1">
            <Input
              onChange={(e) => setAdminRespons(e.target.value)}
              placeholder="Sabab"
            />
          </div> : ""
        }
        disabled={admin_response?.trim() === "" && data?.audio !== null}
        isPending={deletIsloading || updateIsloading}

      />
    </>
  );
};

export default CommentSection;
