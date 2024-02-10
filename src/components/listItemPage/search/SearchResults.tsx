import {AutocompleteItem, Listbox, Spinner} from "@nextui-org/react";
import React, {memo} from "react";
import {useAppDispatch, useAppSelector} from "@/store";
import {searchActions} from "@/store/features/search/searchSlice";
import {ApiRequestTypes} from "@/api/lib/schemas/index.schema";
import SearchResult from "./SearchResult";
import {SearchSelectionType, getInfoByMedia} from "./helpers";

type Props = {
  data: ApiRequestTypes["/tmdb/search/multi"]["response"]["data"];
  isLoading: boolean;
};

const SearchResults = memo(function SearchResults({data, isLoading}: Props) {
  const searchQuery = useAppSelector((state) => state.search.searchQuery);
  const dispatch = useAppDispatch();

  if (isLoading) {
    return <Spinner className="text-center w-full mt-5" color="default" />;
  }

  const onSearchResultClick = (info: SearchSelectionType) => {
    dispatch(searchActions.setSelectedResult(info));
    dispatch(searchActions.setSearchQuery(""));
  };

  return (
    <Listbox
      hideSelectedIcon={true}
      emptyContent={"No content found"}
      hideEmptyContent={searchQuery ? !data?.results : true}
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
      items={searchQuery ? data?.results || [] : []}
      aria-label="Search Results"
    >
      {(item) => {
        const info = getInfoByMedia({
          data: item,
        });

        return (
          <AutocompleteItem
            key={`${item.id}:${item.media_type}`}
            textValue={info.name}
            onClick={() => onSearchResultClick(info)}
          >
            <SearchResult info={info} />
          </AutocompleteItem>
        );
      }}
    </Listbox>
  );
});

export default SearchResults;
