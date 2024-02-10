"use client";

import {useLazySearchMultiQuery} from "@/services/tmdbApi";
import dynamic from "next/dynamic";
import SearchInput from "./SearchInput";

const SearchResults = dynamic(() => import("./SearchResults"));
const SelectedSearchResult = dynamic(() => import("./SelectedSearchResult"));

const SearchContainer = () => {
  const [trigger, {data, isFetching}] = useLazySearchMultiQuery();

  return (
    <>
      <h2 className="text-2xl mb-2 dark">Search</h2>
      <SearchInput searchTrigger={trigger} />
      <SearchResults data={data?.data} isLoading={isFetching} />
      <SelectedSearchResult />
    </>
  );
};

export default SearchContainer;
