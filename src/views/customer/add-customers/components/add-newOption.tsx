"use client";

import { Button } from "../../../../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../../components/ui/dialog";
import { Input } from "../../../../components/ui/input";
import { useCreateItemMedicalMutation } from "../../../../features/settings/sectors-medical-lists";
import { useState } from "react";
import toast from "react-hot-toast";

interface BasicDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  setIsModalOpen: (value: boolean) => void;
  setSelectType: (valu: string) => void;
  selectType: string;

}

const AddNewOptionModal: React.FC<BasicDialogProps> = ({ isOpen, onOpenChange, setIsModalOpen, setSelectType, selectType }) => {
  const [selectValue, setSelectValue] = useState<string>('');
  const [selectNumber, setSelectNumber] = useState<number>();
  const [createItemMedical] = useCreateItemMedicalMutation();

  const handleSubmitSelect = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectType === "sector2") {
        await createItemMedical({ name: selectValue as string, inn_number: Number(selectNumber) as number }).unwrap();
        toast.success("Muvaffaqiyatli qo'shildi");
      } else {
        throw new Error("Noma'lum tanlash turi");
      }
    } catch (error: any) {
      let errorMessage = "Nimadir xato ketdi";
      errorMessage = JSON.stringify(error?.originalStatus) + ' ' + "Xatolik yuz berdi"
      toast.error(errorMessage);
    }
    setIsModalOpen(false);
    setSelectType('');
  };

  

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange} >
      <DialogContent className="space-y-0">
        <DialogHeader>
          <DialogTitle className="text-base font-medium ">
            Yangi variant qo'shish
          </DialogTitle>
        </DialogHeader>

        <Input placeholder="Variant nomi" type="text" onChange={(e) => setSelectValue(e.target.value)} />
        <Input placeholder="INN nomer" type="number" maxLength={15} onChange={(e: any) => setSelectNumber(e.target.value)} />

        <DialogFooter className="mt-2">
          <DialogClose asChild>
            <Button className="h-8 hover:bg-default-200 hover:text-primary-500" type="button" variant="outline">
              Yopish
            </Button>
          </DialogClose>
          <Button disabled={selectValue === ''} onClick={handleSubmitSelect} className="h-8" type="button">Saqlash</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewOptionModal;
