import type { Project as ProjectType } from "@/types";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useAppDispatch } from "@/store/hooks";
import { updateProject } from "@/store/projectsSlice";
import ProjectForm from "./ProjectForm";

type EditProjectDialogProps = {
  project: ProjectType;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function EditProjectDialog({
  project,
  open,
  onOpenChange,
}: EditProjectDialogProps) {
  const { t } = useTranslation(["projects", "common"]);
  const dispatch = useAppDispatch();

  function handleUpdate(values: { name: string; description: string }) {
    dispatch(updateProject({ id: project.id, ...values }));
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("editProject")}</DialogTitle>
          <DialogDescription>{t("editDescription")}</DialogDescription>
        </DialogHeader>
        <ProjectForm
          initialName={project.name}
          initialDescription={project.description}
          submitLabel={t("common:save")}
          onSubmit={handleUpdate}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
