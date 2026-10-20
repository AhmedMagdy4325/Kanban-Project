import type { List as ListType } from "@/types";
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
import { deleteList } from "@/store/listsSlice";

type DeleteListDialogProps = {
  list: ListType;
  cardCount: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function DeleteListDialog({
  list,
  cardCount,
  open,
  onOpenChange,
}: DeleteListDialogProps) {
  const { t } = useTranslation(["board", "common"]);
  const dispatch = useAppDispatch();

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("deleteListTitle")}</AlertDialogTitle>
          <AlertDialogDescription>
            {cardCount === 0
              ? t("deleteListEmpty", { title: list.title })
              : t("deleteListMessage", { title: list.title, count: cardCount })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("common:cancel")}</AlertDialogCancel>
          <AlertDialogAction
            className="bg-danger/90! text-accent-foreground hover:opacity-80"
            onClick={() => dispatch(deleteList(list.id))}
          >
            {t("board:delete")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
