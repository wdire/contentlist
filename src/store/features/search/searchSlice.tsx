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
};

const initialState: SearchState = {
  searchSource: "tmdb",
  searchQuery: "",
  selectedResult: null,
  searchResults: [],
  loading: false,
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
      state.selectedResult = action.payload;
    },
    setSearchResults: (state, action: PayloadAction<ContentInfoType[]>) => {
      state.searchResults = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const searchActions = searchSlice.actions;

export default searchSlice.reducer;
