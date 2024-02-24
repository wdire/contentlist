"use client";

import {useLazySearchMultiQuery} from "@/services/tmdbApi";
import dynamic from "next/dynamic";

import SearchInput from "./SearchInput";
import SearchSourceSelect from "./SearchSourceSelect";

const SearchResults = dynamic(() => import("./SearchResults"));
const SelectedSearchResult = dynamic(() => import("./SelectedSearchResult"));

const SearchContainer = () => {
  const [trigger, {data, isFetching}] = useLazySearchMultiQuery();

  return (
    <>
      <SearchSourceSelect />
      <SearchInput searchTrigger={trigger} />
      <SearchResults data={data?.data} isLoading={isFetching} />
      <SelectedSearchResult />
    </>
  );
};

export default SearchContainer;
