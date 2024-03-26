import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filter: {
    searchValue: "",
    currentPage: 1,
    sort: "id",
    order: "desc",
  },
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    changeFilter(state, action) {
      state.filter = { ...state.filter, ...action.payload };
    },
    resetFilter(state) {
      state.filter = { ...initialState.filter };
    },
  },
});

export const { changeFilter, resetFilter } = filterSlice.actions;

export default filterSlice.reducer;
