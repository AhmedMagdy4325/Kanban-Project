import { useState, type FormEvent, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import AppButton from "../ui/AppButton";
import { useAppDispatch } from "@/store/hooks";
import { addProject } from "@/store/projectsSlice";

type Props = { trigger: ReactNode };

export default function CreateProjectDialog({ trigger }: Props) {
  const { t } = useTranslation("projects");
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("createProject")}</DialogTitle>
          <DialogDescription>{t("createDescription")}</DialogDescription>
        </DialogHeader>
        <CreateProjectForm onDone={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

function CreateProjectForm({ onDone }: { onDone: () => void }) {
  const { t } = useTranslation(["projects", "common"]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) return setError(t("nameRequired"));
    const trimmedDesc = description.trim();

    const id = crypto.randomUUID();
    dispatch(
      addProject({
        id,
        name: trimmedName,
        description: trimmedDesc,
        createdAt: new Date().toISOString(),
      }),
    );

    onDone();
    navigate(`/projects/${id}`);
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
        <AppButton variant="ghost" type="button" onClick={onDone}>
          {t("common:cancel")}
        </AppButton>
        <AppButton variant="primary" type="submit">
          {t("common:create")}
        </AppButton>
      </DialogFooter>
    </form>
  );
}
