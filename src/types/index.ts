export type Priority = "high" | "medium" | "low";

export type Project = {
  id: string;
  name: string;
  createdAt: string;
  description: string;
};

export type List = {
  id: string;
  projectId: string;
  title: string;
  order: number;
};

export type Card = {
  id: string;
  listId: string;
  title: string;
  description: string;
  priority: Priority;
  dueDate?: string;
  order: number;
  completed: boolean;
};
