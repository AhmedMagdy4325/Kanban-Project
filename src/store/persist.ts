import type { Card, List, Project } from "../types";

type PersistedState = { projects: Project[]; lists: List[]; cards: Card[] };

const KEY = "kardify-state";

export function loadState(): PersistedState | undefined {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return undefined;
    const parsed = JSON.parse(raw);

    if (
      Array.isArray(parsed?.projects) &&
      Array.isArray(parsed?.lists) &&
      Array.isArray(parsed?.cards)
    ) {
      return parsed;
    }
  } catch (error) {
    console.warn("Could not load saved state:", error);
  }
  return undefined;
}

export function saveState(state: PersistedState) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch (error) {
    console.warn("Could not save state:", error);
  }
}
