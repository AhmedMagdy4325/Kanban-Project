import type { Card as CardType } from "../../types";
import { useTranslation } from "react-i18next";
import { formatDueDate } from "../../utils/formatDate";
import PriorityBadge from "./PriorityBadge";
import Button from "../ui/AppButton";
import { Circle, CircleCheck } from "lucide-react";
import { toggleComplete } from "../../store/cardsSlice";
import { useAppDispatch } from "../../store/hooks";

type CardItemProps = {
  card: CardType;
  onToggleComplete?: (id: string) => void;
};

export default function CardItem({ card }: CardItemProps) {
  const { t, i18n } = useTranslation("board");
  const dispatch = useAppDispatch();

  return (
    <div className="bg-surface border border-border rounded-xl p-3 flex flex-col gap-2">
      <div className="flex gap-2 items-center" dir="auto">
        <Button
          variant="ghost"
          size="xs"
          onClick={() => dispatch(toggleComplete(card.id))}
          role="checkbox"
          aria-checked={card.completed}
          aria-label={t(card.completed ? "markIncomplete" : "markComplete")}
          className={card.completed ? "text-accent" : "text-foreground-muted"}
        >
          {card.completed ? (
            <CircleCheck size={20} aria-hidden />
          ) : (
            <Circle size={20} aria-hidden />
          )}
        </Button>
        <h3
          className={[
            "text-sm font-medium break-words",
            card.completed ? "line-through text-foreground-muted" : "",
          ].join(" ")}
          dir="auto"
        >
          {card.title}
        </h3>
      </div>

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
