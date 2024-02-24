import React from "react";
import {useAppDispatch, useAppSelector} from "@/store";
import {Button} from "@nextui-org/react";
import {X} from "lucide-react";
import {searchActions} from "@/store/features/search/searchSlice";
import {listActions} from "@/store/features/list/listSlice";
import {STORAGE_ROW_ID} from "@/lib/constants";
import {generateId} from "@/lib/utils/helper.utils";
import SearchResult from "./SearchResult";

const SelectedSearchResult = () => {
  const selectedResult = useAppSelector((state) => state.search.selectedResult);
  const dispatch = useAppDispatch();

  if (!selectedResult) return null;

  const handleAddToListClick = () => {
    dispatch(
      listActions.addContent({
        data: {
          tmdb: {
            id: selectedResult.tmdb?.id || 0,
            media_type: selectedResult.tmdb?.media_type || "movie",
          },
          source: "TMDB",
          image_url: selectedResult.image_url,
          name: selectedResult.name,
        },
        id: generateId(),
        rowId: STORAGE_ROW_ID,
      }),
    );
    dispatch(searchActions.setSelectedResult(null));
    dispatch(searchActions.setSearchQuery(""));
  };

  const handleCloseClick = () => {
    dispatch(searchActions.setSelectedResult(null));
  };

  return (
    <div className="mt-3">
      <div className="flex justify-between items-center text-lg mb-3">
        Selected Content
        <div
          className="hover:text-default-500 active:text-default-400 transition-colors cursor-pointer"
          onClick={handleCloseClick}
        >
          <X />
        </div>
      </div>
      <div className="relative bg-content1 py-2 px-2 rounded-md">
        <SearchResult info={selectedResult} />
      </div>
      <Button color="primary" fullWidth className="mt-4" onClick={handleAddToListClick}>
        Add to List
      </Button>
    </div>
  );
};

export default SelectedSearchResult;
