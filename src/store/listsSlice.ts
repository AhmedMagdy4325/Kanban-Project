import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

import type { List } from "../types";
import { lists as dummyLists } from "../data/dummy";

const initialState: List[] = dummyLists;

const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    addList(
      state,
      action: PayloadAction<{ id: string; projectId: string; title: string }>,
    ) {
      const orders = state
        .filter((l) => l.projectId === action.payload.projectId)
        .map((l) => l.order);
      const nextOrder = Math.max(-1, ...orders) + 1;
      state.push({ ...action.payload, order: nextOrder });
    },
    renameList(state, action: PayloadAction<{ id: string; title: string }>) {
      const list = state.find((l) => l.id === action.payload.id);
      if (list) list.title = action.payload.title;
    },
    deleteList(state, action: PayloadAction<string>) {
      return state.filter((l) => l.id !== action.payload);
    },
  },
});

export const { addList, renameList, deleteList } = listsSlice.actions;

export default listsSlice.reducer;
