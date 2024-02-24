import {SearchSelectionType} from "@/lib/types/search.type";
import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";

export type SearchState = {
  searchSource: "tmdb" | "anilist" | "igdb";
  searchQuery: string;
  selectedResult?: SearchSelectionType | null;
};

const initialState: SearchState = {
  searchSource: "tmdb",
  searchQuery: "",
  selectedResult: null,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchSource: (state, action: PayloadAction<SearchState["searchSource"]>) => {
      state.searchSource = action.payload;
    },
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
