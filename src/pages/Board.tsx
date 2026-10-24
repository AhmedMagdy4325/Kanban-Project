import { useParams } from "react-router-dom";

import { useTranslation } from "react-i18next";
import ListColumn from "../components/board/ListColumn";
import { useSearchParams } from "react-router-dom";

import { useAppSelector } from "../store/hooks";
import { useMemo } from "react";
import type { Card } from "../types";
import AddListDialog from "@/components/board/AddListDialog";
import NotFoundState from "@/components/NotFoundState";
import AppButton from "@/components/ui/AppButton";
import { Plus } from "lucide-react";
import CardDrawer from "@/components/board/CardDrawer";
export default function Board() {
  const { id } = useParams();
  const { t } = useTranslation("board");
  const projects = useAppSelector((s) => s.projects);
  const lists = useAppSelector((s) => s.lists);
  const cards = useAppSelector((s) => s.cards);
  const [searchParams, setSearchParams] = useSearchParams();
  const openCardId = searchParams.get("card");
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
      <NotFoundState
        code="*o*"
        title={t("projectNotFound")}
        linkTo="/projects"
        linkLabel={t("backToProjects")}
      />
    );

  const projectLists = lists
    .filter((l) => l.projectId === id)
    .sort((a, b) => a.order - b.order);

  const openCard = cards.find((c) => c.id === openCardId);
  const drawerCard =
    openCard && projectLists.some((l) => l.id === openCard.listId)
      ? openCard
      : undefined;

  function closeDrawer() {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete("card");
        return next;
      },
      { replace: true },
    );
  }

  return (
    <div className="flex flex-col gap-5 p-4 md:p-6">
      <div className="mb-1">
        <h1 className="text-xl font-semibold" dir="auto">
          {project.name}
        </h1>
        {project.description && (
          <p className="mt-1 text-sm text-foreground-muted" dir="auto">
            {project.description}
          </p>
        )}
      </div>

      {projectLists.length === 0 ? (
        <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 text-center">
          <p className="text-lg font-semibold">{t("noListsTitle")}</p>
          <p className="max-w-sm text-sm text-foreground-muted">
            {t("noListsHint")}
          </p>
          <AddListDialog
            projectId={project.id}
            trigger={
              <AppButton variant="primary">
                <Plus size={16} aria-hidden />
                {t("createList")}
              </AppButton>
            }
          />
        </div>
      ) : (
        <div className="flex items-start gap-4 overflow-x-auto pb-2">
          {projectLists.map((list) => (
            <ListColumn
              key={list.id}
              list={list}
              cards={cardsByList[list.id] ?? []}
            />
          ))}
          <AddListDialog projectId={project.id} />
        </div>
      )}
      <CardDrawer card={drawerCard} onClose={closeDrawer} />
    </div>
  );
}
