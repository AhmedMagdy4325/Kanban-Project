import type { Project as ProjectType } from "@/types";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

type ProjectCardProps = {
  project: ProjectType;
  listCount: number;
};

export default function ProjectCard({ project, listCount }: ProjectCardProps) {
  const { t } = useTranslation("projects");
  return (
    <Link
      to={`/projects/${project.id}`}
      className="flex h-full flex-col gap-2 rounded-xl border border-border bg-surface p-4 transition-colors hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <div>
        <h2 className="truncate text-base font-semibold" dir="auto">
          {project.name}
        </h2>
        <p
          className="line-clamp-2 text-sm text-foreground-muted min-h-10"
          dir="auto"
        >
          {project.description}
        </p>
      </div>

      <span className="mt-auto pt-2 text-xs text-foreground-muted">
        {t("listsCount", { count: listCount })}
      </span>
    </Link>
  );
}
