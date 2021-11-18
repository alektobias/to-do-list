import { createSlice } from "@reduxjs/toolkit";
import { IToDo, IToDoEssencial } from "./types/IToDo";

export const todoSlice = createSlice({
  name: "todo",
  initialState: [] as IToDo[],
  reducers: {
    addTodo: (state, action: { payload: IToDoEssencial }) => {
      const { title, description } = action.payload;
      state.push({
        description,
        title,
        done: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    },
    removeTodo: (state, action: { payload: string }) => {
      const itemIndex = state.findIndex(
        (item) => action.payload === item.createdAt
      );
      state.splice(itemIndex, 1);
    },
    editTodo: (
      state,
      action: {
        payload: IToDoEssencial & { key: string };
      }
    ) => {
      const itemIndex = state.findIndex(
        (item) => action.payload.key === item.createdAt
      );
      state[itemIndex] = {
        ...state[itemIndex],
        ...action.payload,
        updatedAt: new Date().toISOString(),
      };
    },
    toggleDone: (state, action: { payload: string }) => {
      const itemIndex = state.findIndex(
        (item) => action.payload === item.createdAt
      );
      state[itemIndex] = {
        ...state[itemIndex],
        updatedAt: new Date().toISOString(),
        done: !state[itemIndex].done,
      };
    },
  },
});

export const { addTodo, removeTodo, editTodo, toggleDone } = todoSlice.actions;
export default todoSlice.reducer;
