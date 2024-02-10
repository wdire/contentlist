import {SearchSelectionType} from "@/components/listItemPage/search/helpers";

import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";

export type SearchState = {
  searchQuery: string;
  selectedResult?: SearchSelectionType | null;
};

const initialState: SearchState = {
  searchQuery: "",
  selectedResult: null,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedResult: (state, action: PayloadAction<SearchSelectionType | null>) => {
      state.selectedResult = action.payload;
    },
  },
});

export const searchActions = searchSlice.actions;

export default searchSlice.reducer;
