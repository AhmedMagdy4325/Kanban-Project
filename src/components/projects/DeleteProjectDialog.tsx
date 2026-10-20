import type { Project as ProjectType } from "@/types";
import { useTranslation } from "react-i18next";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAppDispatch } from "@/store/hooks";
import { deleteProjectCascade } from "@/store/thunks";
import { useNavigate } from "react-router-dom";

type DeleteProjectDialogProps = {
  project: ProjectType;
  listCount: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function DeleteProjectDialog({
  project,
  listCount,
  open,
  onOpenChange,
}: DeleteProjectDialogProps) {
  const { t } = useTranslation(["projects", "common"]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("deleteProjectTitle")}</AlertDialogTitle>
          <AlertDialogDescription>
            {listCount === 0
              ? t("deleteProjectEmpty", { title: project.name })
              : t("deleteProjectMessage", {
                  title: project.name,
                  count: listCount,
                })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("common:cancel")}</AlertDialogCancel>
          <AlertDialogAction
            className="bg-danger/90! text-accent-foreground hover:opacity-80"
            onClick={() => {
              dispatch(deleteProjectCascade(project.id));
              navigate("/projects");
            }}
          >
            {t("projects:delete")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
