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
import { useCreateItemPaymentMethodMutation } from "@/features/settings/payment-methods-lists";
import { useCreateItemPaymentTypeMutation } from "@/features/settings/payment-type-lists";
import { useCreateItemProductsMutation } from "@/features/settings/products-lists";
import { useCreateItemMutation } from "@/features/settings/sectors-lists";
import { useCreateItemMedicalMutation } from "@/features/settings/sectors-medical-lists";
import { useCreateItemSourceMutation } from "@/features/settings/sourse-lists";
import { Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";

interface BasicDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  setIsModalOpen: (value: boolean) => void;
  setSelectType: (valu: string) => void;
  selectType: string;

}

const AddNewOptionModalSettings: React.FC<BasicDialogProps> = ({ isOpen, onOpenChange, setIsModalOpen, selectType }) => {
  const [selectValue, setSelectValue] = useState<string>('');
  const [selectNumber, setSelectNumber] = useState<number>();
  const [file, setFile] = useState<File | null>(null);
  const [createItem] = useCreateItemMutation();
  const [createItemMedical] = useCreateItemMedicalMutation();
  const [createItemSource] = useCreateItemSourceMutation();
  const [createItemPaymentMethod] = useCreateItemPaymentMethodMutation();
  const [createItemProducts] = useCreateItemProductsMutation();
  const [createItemPaymentType] = useCreateItemPaymentTypeMutation();
  const [isPending, startTransition] = useTransition();




  const handleSubmitSelect = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    const formData = new FormData();

    try {
      if (selectType === "sector") {
        await createItem({ name: selectValue as string }).unwrap();
        toast.success("Muvaffaqiyatli qo'shildi");
      } else if (selectType === "sector2") {
        await createItemMedical({ name: selectValue as string, inn_number: Number(selectNumber) as number }).unwrap();
        toast.success("Muvaffaqiyatli qo'shildi");
      } else if (selectType === "customer") {
        formData.append("name", selectValue);
        if (file) {
          formData.append("image", file);
        }
        await createItemSource(formData).unwrap();
        toast.success("Muvaffaqiyatli qo'shildi");
      } else if (selectType === "products") {
        const formData = new FormData();
        formData.append("name", selectValue);
        if (file) {
          formData.append("image", file);
        }

        await createItemProducts(formData).unwrap();
        toast.success("Muvaffaqiyatli qo'shildi");
      }
      else if (selectType === "paymentMetod") {
        await createItemPaymentMethod({ name: selectValue as string }).unwrap();
        toast.success("Muvaffaqiyatli qo'shildi");
      }
      else if (selectType === "paymentType") {
        await createItemPaymentType({ name: selectValue as string }).unwrap();
        toast.success("Muvaffaqiyatli qo'shildi");
      }
      else {
        throw new Error("Noma'lum tanlash turi");
      }
    } catch (error: any) {
      let errorMessage = "Nimadir xato ketdi";
      errorMessage = JSON.stringify(error?.originalStatus) + ' ' + "Xatolik yuz berdi"
      toast.error(errorMessage);
    }
    setIsModalOpen(false);
  };


  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange} >
      <DialogContent className="space-y-0">
        <DialogHeader>
          <DialogTitle className="text-base font-medium ">
            Yangi {selectType == "sector" ? "sektor" : selectType == "sector2" ? "sector(2)" : selectType == "customer" ? "manbaa" : selectType == "paymentMetod" ? "to'lov usulini" : selectType == "paymentType" ? "to'lov turini" : "uskuna"} qo'shish
          </DialogTitle>
        </DialogHeader>

        <Input placeholder="Variant nomi" type="text" onChange={(e) => setSelectValue(e.target.value)} />

        {selectType === "sector2" && <Input placeholder="INN number" type="number" maxLength={15} onChange={(e: any) => setSelectNumber(e.target.value)} />}

        {
          (selectType == "products" || selectType == "customer") && (
            <Input
              placeholder="Fiyni tanlang"
              type="file"
              onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
            />
          )
        }

        <DialogFooter className="mt-2">
          <DialogClose asChild>
            <Button className="h-8 hover:bg-default-200 hover:text-primary-500" type="button" variant="outline">
              Yopish
            </Button>
          </DialogClose>
          <Button
            disabled={selectValue === '' || isPending}
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

export default AddNewOptionModalSettings;
