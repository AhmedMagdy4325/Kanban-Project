import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import AppButton from "../ui/AppButton";

type ProjectFormProps = {
  initialName?: string;
  initialDescription?: string;
  submitLabel: string;
  onSubmit: (values: { name: string; description: string }) => void;
  onCancel: () => void;
};

export default function ProjectForm({
  initialName = "",
  initialDescription = "",
  submitLabel,
  onSubmit,
  onCancel,
}: ProjectFormProps) {
  const { t } = useTranslation(["projects", "common"]);
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) return setError(t("nameRequired"));
    onSubmit({ name: trimmedName, description: description.trim() });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="project-name">{t("name")}</Label>
        <Input
          id="project-name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError("");
          }}
          placeholder={t("namePlaceholder")}
          maxLength={60}
          autoFocus
          dir="auto"
          aria-invalid={!!error}
          aria-describedby={error ? "project-error" : undefined}
        />
        {error && (
          <p id="project-error" role="alert" className="text-sm text-danger">
            {error}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="project-description">{t("description")}</Label>
        <Textarea
          id="project-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={t("descriptionPlaceholder")}
          maxLength={200}
          rows={3}
          dir="auto"
        />
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
