import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filter: {
    searchValue: "",
    currentPage: 1,
    sort: "id&_order=desc",
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
  },
});

export const { setSort, setCurrentPage, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;
