import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { useEffect, useState } from "react";
import ClockTimer from "./comments/clock-timer";
import { useUpdateItemMutation } from "../../../features/customer/customer";
import DeleteConfirmationDialog from "../../../components/modals/delete-confirmation-dialog";
import { Input } from "../../../components/ui/input";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import { ResultDetails } from "../../../interfaces/customer";



const CustomerTime = ({ data }: { data: ResultDetails | undefined }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActivType, setIsActivType] = useState('');
  const [admin_response, setAdminRespons] = useState("");
  const { pid } = useParams<{ pid: string }>();
  const [updateItem, { isSuccess: crateSuccess, isError: errorCreate, error, isLoading }] = useUpdateItemMutation();

  const handleClickModal = (type: string) => {
    setIsOpen(true);
    setIsActivType(type);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };


  const onConfirm = async () => {
    await updateItem({ id: pid, changes: { text: admin_response, status: isActivType === "active" ? "active" : "in_base" } }).unwrap();
  };

  useEffect(() => {
    if (crateSuccess) {
      if (isActivType === "active") {
        toast.success("Muvaffaqiyatli aktivlashtirildi")
      } else {
        toast.success("Ummumiy ba'zaga qaytarildi")
      }
      setIsOpen(false);
      setAdminRespons("")
      setIsActivType('')
    }
  }, [crateSuccess]);

  useEffect(() => {
    if (errorCreate) {
      const backendErrors = (error as any).originalStatus as Record<string, string>
      toast.error("Status:" + backendErrors + ' ' + "Xatolik yuz berdi")
    }
  }, [errorCreate]);




  return (
    <Card className="lg:w-[414px] lg:m-0 mb-5">
      <CardContent className="p-4">
        <p className="text-default-900 font-medium ">
          Jarayonda shuncha vaqtdan beri turibdi/ shuncha vaqtdan beri bu mijoz
          bilan ishlamadingiz
        </p>
        <div className="w-full flex items-center justify-center">
          <div className="text-indigo-400 w-[130px] h-[171px] ">
            <ClockTimer data={data} />
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <Button onClick={() => handleClickModal("deactive")} className="bg-red-500 hover:bg-red-300 w-[130px] h-[45px]">
            <p className="text-xs">
              Umumiy bazaga
              <br />
              qaytarish
            </p>
          </Button>
          <Button onClick={() => handleClickModal("active")} className="bg-green-500 hover:bg-green-300 w-[130px] h-[45px]">
            <p className="text-xs">Aktivlashtirish</p>
          </Button>

          <DeleteConfirmationDialog
            open={isOpen}
            onClose={closeDialog}
            onConfirm={onConfirm}

            title={isActivType === "active" ? "Aktivlashtirishga rozimisiz?" : "Umumiy bazaga qaytarishga rozimisiz?"}
            description={isActivType === "active" ? "Siz haqiqatdan ham shu ma'lumotni aktivlashtirmochimisiz?" : "Siz haqiqatdan ham shu ma'lumotni umumiy bazaga qaytarmoqchimisiz?"}
            deleteBtnTitle={isActivType === "active" ? "Aktivlashtirish" : "Qaytarish"}
            acceptBtnTitle="Yopish"
            deleteBtnTitleColor="secondary"
            acceptBtnTitleColor={isActivType === "active" ? "success" : "destructive"}
            childer={
              <div className="flex flex-col gap-1">
                <Input
                  onChange={(e) => setAdminRespons(e.target.value)}
                  placeholder="Sabab"
                />
              </div>
            }
            disabled={admin_response?.trim() === ""}
            isPending={isLoading}

          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerTime;



