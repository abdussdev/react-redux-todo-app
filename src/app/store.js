import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todo/todoSlice";
import thunk from "redux-thunk";

export default configureStore({
  reducer: {
    todos: todoReducer,
  },
  middleware: [thunk],
});
