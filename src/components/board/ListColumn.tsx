import { useTranslation } from "react-i18next";
import type { Card as CardType, List as ListType } from "../../types";
import Button from "../ui/AppButton";
import CardItem from "./CardItem";
import { Plus } from "lucide-react";

type ListColumnProps = {
  cards: CardType[];
  list: ListType;
};

export default function ListColumn({ cards, list }: ListColumnProps) {
  const { t } = useTranslation("board");
  return (
    <div className="w-72 shrink-0 flex flex-col gap-3">
      <div className="flex items-center justify-between" dir="auto">
        <h2 className="text-sm font-semibold text-foreground">{list.title}</h2>
        <span className="rounded-full bg-surface-hover text-xs text-foreground-muted px-2 py-0.5">
          {cards.length}
        </span>
      </div>
      <ul className="flex flex-col gap-2 overflow-y-auto overflow-x-hidden min-h-16 max-h-[70vh]">
        {cards.map((card) => (
          <li key={card.id}>
            <CardItem card={card} />
          </li>
        ))}
      </ul>
      <Button variant="ghost" size="md" className="w-full justify-start">
        <strong>
          <Plus size={16} /> {t("addCard")}
        </strong>
      </Button>
    </div>
  );
}
