import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filter: {
    searchValue: "",
    currentPage: 1,
    sort: 'id',
    order: "DESC"
  },
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearchValue(state, action) {
      state.filter.searchValue = action.payload;
    },
    setSort(state, action) {
      state.filter.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.filter.currentPage = action.payload;
    },
    setOrder(state, action) {
      state.filter.order = action.payload;
    },
  },
});

export const { setSort, setCurrentPage, setSearchValue, setOrder } = filterSlice.actions;

export default filterSlice.reducer;
