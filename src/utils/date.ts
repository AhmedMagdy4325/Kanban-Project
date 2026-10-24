const pad = (n: number) => String(n).padStart(2, "0");

function toLocalString(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function todayString(): string {
  return toLocalString(new Date());
}

export function tomorrowString(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1); // handles month and year rollover
  return toLocalString(d);
}

export type DueState = "overdue" | "soon" | "normal";

export function getDueState(dueDate: string): DueState {
  if (dueDate < todayString()) return "overdue";
  if (dueDate <= tomorrowString()) return "soon";
  return "normal";
}
