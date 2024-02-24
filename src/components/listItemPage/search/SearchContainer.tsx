"use client";

import dynamic from "next/dynamic";

import SearchInput from "./SearchInput";
import SearchSourceSelect from "./SearchSourceSelect";

const SearchResults = dynamic(() => import("./SearchResults"));
const SelectedSearchResult = dynamic(() => import("./SelectedSearchResult"));

const SearchContainer = () => {
  return (
    <>
      <SearchSourceSelect />
      <SearchInput />
      <SearchResults />
      <SelectedSearchResult />
    </>
  );
};

export default SearchContainer;
