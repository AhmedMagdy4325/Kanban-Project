import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  const { t } = useTranslation("notFound");

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="text-7xl font-bold text-foreground-muted md:text-9xl">
        404
      </h1>
      <div className="flex flex-col gap-1">
        <p className="text-xl font-semibold md:text-2xl">{t("title")}</p>
        <p className="max-w-sm text-sm text-foreground-muted">{t("message")}</p>
      </div>
      <Link
        to="/"
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        dir="auto"
      >
        {t("backHome")}
        <ArrowRight size={16} className="rtl:rotate-180" />
      </Link>
    </div>
  );
}
