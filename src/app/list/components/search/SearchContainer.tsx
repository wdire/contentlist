"use client";

import SearchInput from "./SearchInput";
import SearchSourceSelect from "./SearchSourceSelect";
import SearchResults from "./SearchResults";
import SelectedSearchResult from "./SelectedSearchResult";
import SearchTextCreate from "./SearchTextCreate";

const SearchContainer = () => {
  return (
    <>
      <SearchSourceSelect />
      <SearchInput />
      <SearchTextCreate />
      <SearchResults />
      <SelectedSearchResult />
    </>
  );
};

export default SearchContainer;
