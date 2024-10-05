import { useTransition } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../components/ui/alert-dialog";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";

const DeleteSettingDialog = ({ open, onClose, title, description, deleteBtnTitle, acceptBtnTitle, onConfirm, defaultToast = true, toastMessage, color,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  defaultToast?: boolean;
  toastMessage?: any;
  title?: string;
  description?: string;
  deleteBtnTitle?: string;
  acceptBtnTitle?: string;
  color?: string;
}) => {
  const [isPending, startTransition] = useTransition();

  const handleConfirm = async () => {
    await onConfirm();
    onClose();
    if (defaultToast) {
      toast.success(toastMessage, {
        position: "top-center",
      });
    }
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction color={color} onClick={onClose}>
            {acceptBtnTitle}
          </AlertDialogAction>
          <AlertDialogCancel className={isPending ? "pointer-events-none" : ""}
            onClick={() => startTransition(handleConfirm)}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? "Iltimos kuting..." : deleteBtnTitle}
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteSettingDialog;
