import { useParams } from "react-router-dom";

import { useTranslation } from "react-i18next";
import ListColumn from "../components/board/ListColumn";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useAppSelector } from "../store/hooks";
import { useMemo } from "react";
import type { Card } from "../types";
import AddListDialog from "@/components/board/AddListDialog";

export default function Board() {
  const { id } = useParams();
  const { t } = useTranslation("board");
  const projects = useAppSelector((s) => s.projects);
  const lists = useAppSelector((s) => s.lists);
  const cards = useAppSelector((s) => s.cards);

  const cardsByList = useMemo(() => {
    const groups: Record<string, Card[]> = {};
    for (const c of [...cards].sort((a, b) => a.order - b.order)) {
      (groups[c.listId] ??= []).push(c);
    }
    return groups;
  }, [cards]);
  const project = projects.find((p) => p.id === id);

  if (!project)
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] gap-2 text-center">
        <h2 className="text-7xl md:text-9xl text-foreground-muted" aria-hidden>
          *o*
        </h2>

        <p className="text-foreground-muted p-5">{t("projectNotFound")}</p>

        <Link
          className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
          to="/"
        >
          {t("backToHome")}
          <ArrowRight size={16} className="rtl:rotate-180" />
        </Link>
      </div>
    );

  const projectLists = lists
    .filter((l) => l.projectId === id)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="flex flex-col gap-5 p-6">
      <div className="mb-1">
        <h1 className="text-xl font-semibold" dir="auto">
          {project.name}
        </h1>
        <p className="mt-1 text-sm text-foreground-muted" dir="auto">
          {project.description}
        </p>
      </div>
      <div className="flex gap-4 overflow-x-auto items-start">
        {projectLists.map((list) => (
          <ListColumn
            key={list.id}
            list={list}
            cards={cardsByList[list.id] ?? []}
          />
        ))}
        <AddListDialog projectId={project.id} />
      </div>
    </div>
  );
}
