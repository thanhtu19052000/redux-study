import { configureStore } from "@reduxjs/toolkit";
import todoListReducer from "./todoSlice";
import searchSliceReducer from "./searchSlice";
export default configureStore({
  reducer: {
    todoList: todoListReducer,
    search: searchSliceReducer,
  },
});
