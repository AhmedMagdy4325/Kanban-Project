import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

import type { Project } from "../types";
import { projects as dummyProjects } from "../data/dummy";

const initialState: Project[] = dummyProjects;

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProject(state, action: PayloadAction<Project>) {
      state.push(action.payload);
    },
    renameProject(state, action: PayloadAction<{ id: string; name: string }>) {
      const project = state.find((p) => p.id === action.payload.id);
      if (project) project.name = action.payload.name;
    },
    deleteProject(state, action: PayloadAction<string>) {
      return state.filter((p) => p.id !== action.payload);
    },
  },
});

export const { addProject, renameProject, deleteProject } =
  projectsSlice.actions;

export default projectsSlice.reducer;
