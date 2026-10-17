import { useTranslation } from "react-i18next";
import { projects } from "../../data/dummy";
import { NavLink } from "react-router-dom";

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

export default function Sidebar({ open, onClose }: SidebarProps) {
  const { t } = useTranslation();
  return (
    <>
      {open && (
        <div
          className="fixed inset-x-0 top-14 bottom-0 z-30 bg-overlay md:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={[
          "fixed top-14 bottom-0 start-0 z-40 w-64 flex flex-col gap-2 border-e border-border bg-surface p-3 transition-transform md:static md:translate-x-0 ",
          open
            ? "translate-x-0"
            : "max-md:-translate-x-full max-md:rtl:translate-x-full",
        ].join(" ")}
        dir="auto"
      >
        <h2 className="px-2 text-xs font-semibold uppercase text-foreground-muted">
          {t("projects")}
        </h2>

        <ul className=" flex flex-col gap-1 p-2">
          {projects.map((p) => (
            <li key={p.id}>
              <NavLink
                to={`/projects/${p.id}`}
                onClick={onClose}
                className={({ isActive }) =>
                  [
                    "block rounded-md px-2 py-1.5 text-[13px] font-medium transition-colors ",
                    isActive
                      ? "bg-surface-hover text-foreground font-semibold"
                      : "text-foreground-muted hover:bg-surface-hover hover:text-foreground",
                  ].join(" ")
                }
                dir="auto"
              >
                {p.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
