"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useUpdateItemPaymentMethodMutation } from "@/features/settings/payment-methods-lists";
import { useUpdateItemPaymentTypeMutation } from "@/features/settings/payment-type-lists";
import { useUpdateItemProductsMutation } from "@/features/settings/products-lists";
import { FilterResult, useUpdateItemMutation } from "@/features/settings/sectors-lists";
import { useUpdateItemMedicalMutation } from "@/features/settings/sectors-medical-lists";
import { useUpdateItemSourseMutation } from "@/features/settings/sourse-lists";
import { Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";

interface BasicDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  setIsModalOpen: (value: boolean) => void;
  setSelectType: (value: string) => void;
  selectType?: string;
  item: FilterResult;
}

const UpdateModalSettings: React.FC<BasicDialogProps & { itemId: string }> = ({
  isOpen,
  onOpenChange,
  setIsModalOpen,
  setSelectType,
  selectType,
  item,
}) => {
  const [selectValue, setSelectValue] = useState<string>('');
  const [selectNumber, setSelectNumber] = useState<number>(0);
  const [file, setFile] = useState<File | null>(null);
  const [updateItem] = useUpdateItemMutation();
  const [updateItemMedical] = useUpdateItemMedicalMutation();
  const [updateItemSourse] = useUpdateItemSourseMutation();
  const [updateItemProducts] = useUpdateItemProductsMutation();
  const [updateItemPaymentMethod] = useUpdateItemPaymentMethodMutation();
  const [updateItemPaymentType] = useUpdateItemPaymentTypeMutation();
  const [isPending, startTransition] = useTransition();



  const handleSubmitSelect = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    const formData = new FormData();
    if (file) {
      formData.append("image", file);
    }
    if (selectType !== '') {
      formData.append("name", selectValue || item.name);
    }


    try {
      if (selectType === "sector" && item) {
        if (selectValue !== "") {
          await updateItem({ id: item.id.toString(), changes: { name: selectValue || item.name } }).unwrap();
          toast.success("Ma'lumot o'zgartirildi");
        } else {
          toast.error("O'zgartirish kiritilmadi!");
        }
      } else if (selectType === "sector2" && item) {
        if (selectNumber !== 0 || selectValue !== "") {
          await updateItemMedical({ id: item.id.toString(), changes: { name: selectValue || item?.name, inn_number: selectNumber || item?.inn_number } }).unwrap();
          toast.success("Ma'lumot o'zgartirildi");
        } else {
          toast.error("O'zgartirish kiritilmadi!");
        }
      } else if (selectType === "customer" && item) {
        if (file !== null || selectValue !== "") {
          await updateItemSourse({ id: item.id.toString(), formData }).unwrap();
          toast.success("Ma'lumot o'zgartirildi");
        } else {
          toast.error("O'zgartirish kiritilmadi!");
        }
      } else if (selectType === "products") {
        if (file !== null || selectValue !== "") {
          await updateItemProducts({ id: item.id.toString(), formData }).unwrap();
          toast.success("Ma'lumot o'zgartirildi");
        } else {
          toast.error("O'zgartirish kiritilmadi!");
        }
      } else if (selectType === "paymentMetod" && item) {
        if (selectValue !== "") {
          await updateItemPaymentMethod({ id: item.id.toString(), changes: { name: selectValue } }).unwrap();
          toast.success("Ma'lumot o'zgartirildi");
        } else {
          toast.error("O'zgartirish kiritilmadi!");
        }
      } else if (selectType === "paymentType" && item) {
        if (selectValue !== "") {
          await updateItemPaymentType({ id: item.id.toString(), changes: { name: selectValue } }).unwrap();
          toast.success("Ma'lumot o'zgartirildi");
        } else {
          toast.error("O'zgartirish kiritilmadi!");
        }
      }
      else {
        throw new Error("Noma'lum tanlash turi");
      }
    } catch (error: any) {
      const errorMessage = `${error?.originalStatus} Xatolik yuz berdi`;
      toast.error(`Xatolik: ${errorMessage}`);
    }
    setIsModalOpen(false);
  };


  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="space-y-0">
        <DialogHeader>
          <DialogTitle className="text-base font-medium">
            {selectType === "sector"
              ? "Sektor ma'lumotlarini"
              : selectType === "sector2"
                ? "Sector(2) ma'lumotlarini"
                : selectType === "customer"
                  ? "Xaridor manbaini"
                  : selectType === "paymentMetod"
                    ? "to'lov usulini"
                    : selectType === "paymentType"
                      ? "To'lov turini"
                      : "Uskuna ma'lumotlarini"} o'zgartirish
          </DialogTitle>
        </DialogHeader>

        <Input
          placeholder="Variant nomi"
          type="text"
          onChange={(e: any) => setSelectValue(e.target.value)}
          defaultValue={item.name}
        />

        {
          selectType === "sector2" &&
          <Input
            defaultValue={item?.inn_number}
            placeholder="INN number" type="number" maxLength={15} onChange={(e: any) => setSelectNumber(e.target.valueAsNumber)} />
        }

        {(selectType === "products" || selectType === "customer") && (
          <Input
            type="file"
            onChange={(e: any) => setFile(e.target.files[0])}
          />
        )}

        <DialogFooter className="mt-2">
          <DialogClose asChild>
            <Button
              className="h-8 hover:bg-default-200 hover:text-primary-500"
              type="button"
              variant="outline"
            >
              Yopish
            </Button>
          </DialogClose>
          <Button
            disabled={isPending}
            onClick={(e) => startTransition(() => handleSubmitSelect(e))}
            className="h-8"
            type="button"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Yuklanmoqda...
              </>
            ) : (
              "Saqlash"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateModalSettings;
