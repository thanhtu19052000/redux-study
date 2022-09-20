import { axiosClient } from "./axiosClient";

export const todoListApi = {
  getAll() {
    const res = axiosClient.get("/api/todos");
    return res;
  },
  addTodo(todo) {
    const res = axiosClient.post("api/todos", todo);
    return res;
  },
  updateChecked(id) {
    const res = axiosClient.post("api/updateTodo", id);
    return res;
  },
};
