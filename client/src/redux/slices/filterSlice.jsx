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
    resetFilter(state) {
      state.filter.currentPage = initialState.filter.currentPage;
      state.filter.sort = initialState.filter.sort;
      state.filter.order = initialState.filter.order;
    },
  },
});

export const {
  setSort,
  setCurrentPage,
  setSearchValue,
  setOrder,
  resetFilter,
} = filterSlice.actions;

export default filterSlice.reducer;
