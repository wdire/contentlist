"use client";

import SearchInput from "./SearchInput";
import SearchSourceSelect from "./SearchSourceSelect";
import SearchResults from "./SearchResults";
import SelectedSearchResult from "./SelectedSearchResult";

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
