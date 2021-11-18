import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todo/reducer";

export default configureStore({
  reducer: {
    todo: todoReducer,
  },
});
