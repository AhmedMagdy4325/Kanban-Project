import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useAppDispatch } from "@/store/hooks";
import { addCard } from "@/store/cardsSlice";
import CardForm, { type CardFormValues } from "./CardForm";

type Props = {
  listId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function AddCardDialog({ listId, open, onOpenChange }: Props) {
  const { t } = useTranslation(["board", "common"]);
  const dispatch = useAppDispatch();

  function handleAdd(values: CardFormValues) {
    dispatch(addCard({ id: crypto.randomUUID(), listId, ...values }));
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("addCard")}</DialogTitle>
          <DialogDescription>{t("addCardDescription")}</DialogDescription>
        </DialogHeader>
        <CardForm
          submitLabel={t("common:create")}
          onSubmit={handleAdd}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
