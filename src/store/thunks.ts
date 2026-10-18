import type { AppDispatch, RootState } from "./index";
import { deleteList } from "./listsSlice";
import { deleteProject } from "./projectsSlice";

export const deleteProjectCascade =
  (projectId: string) => (dispatch: AppDispatch, getState: () => RootState) => {
    getState()
      .lists.filter((l) => l.projectId === projectId)
      .forEach((l) => dispatch(deleteList(l.id)));
    dispatch(deleteProject(projectId));
  };
