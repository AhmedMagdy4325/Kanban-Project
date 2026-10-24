import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import AppButton from "../ui/AppButton";
import { todayString } from "@/utils/date";
import type { Priority } from "@/types";

export type CardFormValues = {
  title: string;
  description: string;
  priority: Priority;
  dueDate?: string;
};

type CardFormProps = {
  initialValues?: CardFormValues;
  submitLabel: string;
  onSubmit: (values: CardFormValues) => void;
  onCancel: () => void;
};

const priorities: Priority[] = ["low", "medium", "high"];

export default function CardForm({
  initialValues,
  submitLabel,
  onSubmit,
  onCancel,
}: CardFormProps) {
  const { t } = useTranslation(["board", "common"]);
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [description, setDescription] = useState(
    initialValues?.description ?? "",
  );
  const [priority, setPriority] = useState<Priority>(
    initialValues?.priority ?? "medium",
  );
  const [dueDate, setDueDate] = useState(initialValues?.dueDate ?? "");
  const [titleError, setTitleError] = useState("");
  const [dateError, setDateError] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmedTitle = title.trim();
    let valid = true;

    if (!trimmedTitle) {
      setTitleError(t("titleRequired"));
      valid = false;
    }
    if (
      dueDate &&
      dueDate !== initialValues?.dueDate &&
      dueDate < todayString()
    ) {
      setDateError(t("dueDatePast"));
      valid = false;
    }

    if (!valid) return;
    onSubmit({
      title: trimmedTitle,
      description: description.trim(),
      priority,
      dueDate: dueDate || undefined,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="card-priority">{t("priority")}</Label>
        <select
          id="card-priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          className="h-9 w-full rounded-md border border-border bg-surface px-3 text-sm"
        >
          {priorities.map((p) => (
            <option key={p} value={p}>
              {t(`common:priority.${p}`)}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="card-title">{t("title")}</Label>
        <Input
          id="card-title"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setTitleError("");
          }}
          aria-invalid={!!titleError}
          aria-describedby={titleError ? "card-title-error" : undefined}
        />
        {titleError && (
          <p id="card-title-error" role="alert" className="text-sm text-danger">
            {titleError}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="card-desc">{t("description")}</Label>
        <Textarea
          id="card-desc"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="card-due">{t("dueDate")}</Label>
        <Input
          id="card-due"
          type="date"
          value={dueDate}
          min={todayString()}
          onChange={(e) => {
            setDueDate(e.target.value);
            setDateError("");
          }}
          aria-invalid={!!dateError}
          aria-describedby={dateError ? "card-date-error" : undefined}
        />
        {dateError && (
          <p id="card-date-error" role="alert" className="text-sm text-danger">
            {dateError}
          </p>
        )}
      </div>
      <DialogFooter>
        <AppButton variant="ghost" type="button" onClick={onCancel}>
          {t("common:cancel")}
        </AppButton>
        <AppButton variant="primary" type="submit">
          {submitLabel}
        </AppButton>
      </DialogFooter>
    </form>
  );
}
