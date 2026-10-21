import { useTranslation } from "react-i18next";
import type { Card as CardType, List as ListType } from "../../types";
import AppButton from "../ui/AppButton";
import CardItem from "./CardItem";
import { MoreHorizontal, Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import RenameListDialog from "./RenameListDialog";
import DeleteListDialog from "./DeleteListDialog";

type ListColumnProps = {
  cards: CardType[];
  list: ListType;
};

export default function ListColumn({ cards, list }: ListColumnProps) {
  const [renameOpen, setRenameOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const { i18n, t } = useTranslation("board");
  const dir = i18n.dir();

  return (
    <div className="w-72 shrink-0 flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <h2
            dir="auto"
            className="truncate text-sm font-semibold text-foreground"
          >
            {list.title}
          </h2>
          <span className="shrink-0 rounded-full bg-surface-hover px-2 py-0.5 text-xs text-foreground-muted">
            {cards.length}
          </span>
        </div>
        <div>
          <DropdownMenu dir={dir}>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost" aria-label={t("moreOptions")}>
                <MoreHorizontal aria-hidden />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={() => setRenameOpen(true)}>
                {t("rename")}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-danger focus:text-danger"
                onSelect={() => setDeleteOpen(true)}
              >
                {t("delete")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <ul className="flex flex-col gap-2 overflow-y-auto overflow-x-hidden min-h-16 max-h-[70vh]">
        {cards.length === 0 && (
          <li className="rounded-xl border border-dashed border-border p-4 text-center text-xs text-foreground-muted">
            {t("noCards")}
          </li>
        )}
        {cards.map((card) => (
          <li key={card.id}>
            <CardItem card={card} />
          </li>
        ))}
      </ul>
      <AppButton variant="ghost" size="md" className="w-full justify-start">
        <strong>
          <Plus size={16} /> {t("addCard")}
        </strong>
      </AppButton>
      <RenameListDialog
        list={list}
        open={renameOpen}
        onOpenChange={setRenameOpen}
      />
      <DeleteListDialog
        list={list}
        cardCount={cards.length}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </div>
  );
}
