import { useParams } from "react-router-dom";
import { cards, lists, projects } from "../data/dummy";
import { useTranslation } from "react-i18next";
import ListColumn from "../components/board/ListColumn";

export default function Board() {
  const { id } = useParams();
  const { t } = useTranslation("board");
  const project = projects.find((p) => p.id === id);
  if (!project)
    return <p className="text-foreground-muted p-5">{t("projectNotFound")}</p>;

  const projectLists = lists
    .filter((l) => l.projectId === id)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="flex flex-col gap-5 p-6">
      <div>
        <h1 className="text-xl font-semibold" dir="auto">
          {project.name}
        </h1>
        <p className="mt-1 text-sm text-foreground-muted" dir="auto">
          {project.description}
        </p>
      </div>
      <div className="flex gap-4 overflow-x-auto items-start">
        {projectLists.map((list) => {
          const listCards = cards
            .filter((c) => c.listId === list.id)
            .sort((a, b) => a.order - b.order);
          return <ListColumn key={list.id} list={list} cards={listCards} />;
        })}
      </div>
    </div>
  );
}
