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
  const dispatch = useAppDispatch();

  if (searchLoading) {
    return <Spinner className="text-center w-full mt-5" color="default" />;
  }

  const onSearchResultClick = (info: ContentInfoType) => {
    dispatch(searchActions.setSelectedResult(info));
    dispatch(searchActions.setSearchQuery(""));
  };

  return (
    <Listbox
      hideSelectedIcon={true}
      emptyContent={"No content found"}
      hideEmptyContent={searchQuery ? !stateSearchResults : true}
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
      className="max-h-[320px] overflow-y-auto pt-2"
      items={searchQuery ? stateSearchResults || [] : []}
      aria-label="Search Results"
    >
      {(item) => {
        return (
          <ListboxItem
            key={`${Math.random()}`}
            textValue={item?.name}
            onClick={() => onSearchResultClick(item)}
          >
            <SearchResult info={item} />
          </ListboxItem>
        );
      }}
    </Listbox>
  );
});

export default SearchResults;
