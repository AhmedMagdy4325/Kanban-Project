import type { Card as CardType } from "../../types";
import { useTranslation } from "react-i18next";
import { formatDueDate } from "../../utils/formatDate";
import PriorityBadge from "./PriorityBadge";

type CardItemProps = {
  card: CardType;
  onToggleComplete?: (id: string) => void;
};

export default function CardItem({ card }: CardItemProps) {
  const { i18n } = useTranslation();

  return (
    <div className="bg-surface border border-border rounded-xl p-3 flex flex-col gap-2">
      <div></div>
      <h3 className="text-sm font-medium wrap-break-words">{card.title}</h3>

      <div className="flex items-center gap-2">
        {card.dueDate && (
          <span className="text-xs text-foreground-muted">
            {formatDueDate(card.dueDate, i18n.resolvedLanguage ?? "en")}
          </span>
        )}

        <PriorityBadge priority={card.priority} />
      </div>
    </div>
  );
}
