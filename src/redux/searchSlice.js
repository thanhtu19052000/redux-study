import { createSlice } from "@reduxjs/toolkit";
import todoSliceReducer from "./todoSlice";

const initialState = {
  search: " ",
  radio: "All",
  priority: [],
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    textSearch: (state, action) => {
      state.search = action.payload;
    },
    radioSearch: (state, action) => {
      state.radio = action.payload;
    },
    prioritySearch: (state, action) => {
      state.priority = action.payload;
    },
  },
});
export const { textSearch, radioSearch, prioritySearch } = searchSlice.actions;
export default searchSlice.reducer;
