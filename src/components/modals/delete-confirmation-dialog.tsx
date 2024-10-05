import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";

const DeleteConfirmationDialog = ({
  open,
  onClose,
  title,
  description,
  deleteBtnTitle,
  deleteBtnTitleColor = "destructive",
  acceptBtnTitle,
  acceptBtnTitleColor = "success",
  onConfirm,
  childer = "",
  isPending = false,
  disabled = false,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  defaultToast?: boolean;
  title?: string;
  description?: string;
  deleteBtnTitle?: string;
  deleteBtnTitleColor?: string;
  acceptBtnTitle?: string;
  acceptBtnTitleColor?: string;
  childer?: any;
  isPending?: boolean;
  disabled?: boolean;
}) => {
  const handleConfirm = async () => {
    await onConfirm();
    onClose();
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <div>{childer}</div>
        <AlertDialogFooter>
          <AlertDialogCancel color={deleteBtnTitleColor} className="h-[35px]" onClick={onClose}>
            {acceptBtnTitle}
          </AlertDialogCancel>
          <AlertDialogAction disabled={disabled} color={acceptBtnTitleColor} className={"h-[35px]"} onClick={handleConfirm}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {deleteBtnTitle}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmationDialog;
