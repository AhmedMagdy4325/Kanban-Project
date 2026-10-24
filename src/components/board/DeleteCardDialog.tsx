import { useTranslation } from "react-i18next";
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
import { useAppDispatch } from "@/store/hooks";
import { deleteCard } from "@/store/cardsSlice";
import type { Card as CardType } from "@/types";

type DeleteCardDialogProps = {
  card: CardType;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleted: () => void;
};

export default function DeleteCardDialog({
  card,
  open,
  onOpenChange,
  onDeleted,
}: DeleteCardDialogProps) {
  const { t } = useTranslation(["board", "common"]);
  const dispatch = useAppDispatch();

  function handleDelete() {
    dispatch(deleteCard(card.id));
    onDeleted();
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("deleteCardTitle")}</AlertDialogTitle>
          <AlertDialogDescription dir="auto">
            {t("deleteCardMessage", { title: card.title })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("common:cancel")}</AlertDialogCancel>
          <AlertDialogAction
            className="bg-danger! text-accent-foreground! hover:bg-danger/90!"
            onClick={handleDelete}
          >
            {t("delete")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
