export function formatDueDate(dateString: string, locale: string): string {
  const date = new Date(`${dateString}T00:00:00`);
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
  }).format(date);
}
