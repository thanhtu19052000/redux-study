import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { todoListApi } from "../components/API/todoListApi";

const initialValue = { status: "idle", todos: [] };

export const todoListSlice = createSlice({
  name: "todoList",
  initialState: initialValue,
  reducers: {
    add: (state, action) => {
      state.push(action.payload);
    },
    updatechecked: (state, action) => {
      state.find((item) => {
        return item.name === action.payload;
      }).status = !state.find((item) => {
        return item.name === action.payload;
      }).status;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodo.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTodo.fulfilled, (state, action) => {
        state.status = "idle";
        state.todos = action.payload;
      })
      .addCase(addNewTodo.fulfilled, (state, action) => {
        state.todos.push({
          ...action.payload,
          name: action.payload.name + " ",
        });
      })
      .addCase(updateCheckedThunk.fulfilled, (state, action) => {
        console.log(action.payload);
        const index = state.todos.findIndex(
          (item) => item.id === action.payload.id
        );
        state.todos.splice(index, 1, action.payload);
      });
  },
});
export const { add, updatechecked } = todoListSlice.actions;
export default todoListSlice.reducer;

export const fetchTodo = createAsyncThunk("todos/fetchTodo", async () => {
  const res = await todoListApi.getAll();
  return res.data.todos;
});

export const addNewTodo = createAsyncThunk(
  "todos/addNewTodo",
  async (payload) => {
    const res = await todoListApi.addTodo(payload);
    return res.data.todos;
  }
);
export const updateCheckedThunk = createAsyncThunk(
  "todos/updateCheckedThunk",
  async (id) => {
    const res = await todoListApi.updateChecked(id);
    return res.data.todos;
  }
);

// export function addTodos(todo) {
//   return function addTodosThunk(dispatch, getState) {
//     todo.name = todo.name + " ";
//     dispatch(todoListSlice.actions.add(todo));
//   };
// }
