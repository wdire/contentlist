"use client";

import {Listbox, ListboxItem, Spinner} from "@nextui-org/react";
import React, {memo} from "react";
import {useAppDispatch, useAppSelector} from "@/store";
import {searchActions} from "@/store/features/search/searchSlice";
import {ContentInfoType} from "@/lib/types/list.type";
import SearchResult from "./SearchResult";

const SearchResults = memo(function SearchResults() {
  const searchQuery = useAppSelector((state) => state.search.searchQuery);
  const stateSearchResults = useAppSelector((state) => state.search.searchResults);
  const searchLoading = useAppSelector((state) => state.search.loading);
  const showResults = useAppSelector((state) => state.search.showResults);
  const resultsExistingContentIndexes = useAppSelector(
    (state) => state.search.resultsExistingContentIndexes,
  );
  const dispatch = useAppDispatch();

  const onSearchResultClick = (info: ContentInfoType) => {
    dispatch(searchActions.setSelectedResult(info));
    dispatch(searchActions.setShowResults(false));
  };

  if (searchLoading) {
    return <Spinner className="text-center w-full mt-5" color="default" />;
  }

  let itemIndex = -1;

  return (
    <Listbox
      hideSelectedIcon={true}
      emptyContent={"No content found"}
      hideEmptyContent={searchQuery && showResults ? !stateSearchResults : true}
      itemClasses={{
        base: [
          "rounded-md",
          "text-default-500",
          "transition-opacity",
          "data-[hover=true]:text-foreground",
          "dark:data-[hover=true]:bg-default-50",
          "data-[pressed=true]:opacity-70",
          "data-[hover=true]:bg-default-200",
        ],
      }}
      className="max-h-60 sm:max-h-80 overflow-y-auto pt-2"
      items={searchQuery && showResults ? stateSearchResults || [] : []}
      aria-label="Search Results"
      disabledKeys={resultsExistingContentIndexes}
    >
      {(item) => {
        itemIndex += 1;

        const existingContent = resultsExistingContentIndexes.includes(`search_${itemIndex}`);

        return (
          <ListboxItem
            key={`search_${itemIndex}`}
            textValue={item?.name}
            onPress={() => onSearchResultClick(item)}
          >
            <SearchResult info={item} notPoster existingContent={existingContent} />
          </ListboxItem>
        );
      }}
    </Listbox>
  );
});

export default SearchResults;
