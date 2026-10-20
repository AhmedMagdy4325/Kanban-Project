import { useAppDispatch } from "@/store/hooks";
import { addProject } from "@/store/projectsSlice";
import { useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import ProjectForm from "./ProjectForm";

type Props = { trigger: ReactNode };

export default function CreateProjectDialog({ trigger }: Props) {
  const { t } = useTranslation(["projects", "common"]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  function handleCreate(values: { name: string; description: string }) {
    const id = crypto.randomUUID();
    dispatch(
      addProject({ id, ...values, createdAt: new Date().toISOString() }),
    );
    setOpen(false);
    navigate(`/projects/${id}`);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("createProject")}</DialogTitle>
          <DialogDescription>{t("createDescription")}</DialogDescription>
        </DialogHeader>
        <ProjectForm
          submitLabel={t("common:create")}
          onSubmit={handleCreate}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
