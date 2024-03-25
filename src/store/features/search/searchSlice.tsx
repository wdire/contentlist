import {ContentInfoType} from "@/lib/types/list.type";
import {SearchSource} from "@/lib/types/search.type";
import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";

export type SearchState = {
  searchSource: SearchSource;
  searchQuery: string;
  selectedResult?: ContentInfoType | null;
  searchResults: ContentInfoType[];
  loading: boolean;
  showResults: boolean;
  resultsExistingContentIndexes: string[];
};

const initialState: SearchState = {
  searchSource: "tmdb",
  searchQuery: "",
  selectedResult: null,
  searchResults: [],
  loading: false,
  showResults: false,
  resultsExistingContentIndexes: [],
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
    setSelectedResult: (state, action: PayloadAction<ContentInfoType | null>) => {
      if (!action.payload) {
        state.showResults = true;
      }

      state.selectedResult = action.payload;
    },
    setSearchResults: (state, action: PayloadAction<ContentInfoType[]>) => {
      state.searchResults = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setShowResults: (state, action: PayloadAction<boolean>) => {
      state.showResults = action.payload;
    },
    setResultsExistingContentIndexes: (state, action: PayloadAction<string[]>) => {
      state.resultsExistingContentIndexes = action.payload;
    },
  },
});

export const searchActions = searchSlice.actions;

export default searchSlice.reducer;
