import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "./projectsSlice";
import listsReducer from "./listsSlice";
import cardReducer from "./cardsSlice";
import { loadState, saveState } from "./persist";

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    lists: listsReducer,
    cards: cardReducer,
  },
  preloadedState: loadState(),
});
store.subscribe(() => saveState(store.getState()));

export type AppStore = typeof store;

export type RootState = ReturnType<AppStore["getState"]>;

export type AppDispatch = AppStore["dispatch"];
