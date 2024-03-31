import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "@/store";
import {Button, Switch, Tooltip} from "@nextui-org/react";
import {X} from "lucide-react";
import {searchActions} from "@/store/features/search/searchSlice";
import {listActions} from "@/store/features/list/listSlice";
import {STORAGE_ROW_ID} from "@/lib/constants";
import {generateId} from "@/lib/utils/helper.utils";
import {Content} from "@/lib/types/list.type";
import {toast} from "react-toastify";
import SearchResult from "./SearchResult";

const SelectedSearchResult = () => {
  const selectedResult = useAppSelector((state) => state.search.selectedResult);
  const dispatch = useAppDispatch();

  const [isPosterSize, setIsPosterSize] = useState<PrismaJson.ContentType["notPoster"]>(true);
  const [isImageSquare, setIsImageSquare] = useState<PrismaJson.ContentType["square"]>(false);

  if (!selectedResult) return null;

  const handleAddToListClick = () => {
    const newContent: Content = {
      data: {
        image_url: selectedResult.image_url,
        name: selectedResult.name,
        source: selectedResult.source,
      },
      id: generateId(),
      rowId: STORAGE_ROW_ID,
    };

    if (isPosterSize === false) {
      newContent.data.notPoster = true;
    }

    if (isImageSquare === true) {
      newContent.data.square = true;
    }

    if (selectedResult.source === "tmdb") {
      newContent.data.tmdb = selectedResult.tmdb;
    } else if (selectedResult.source === "anilist") {
      newContent.data.anilist = selectedResult.anilist;
    } else if (selectedResult.source === "igdb") {
      newContent.data.igdb = selectedResult.igdb;
    } else if (selectedResult.source === "wikipedia") {
      newContent.data.wikipedia = selectedResult.wikipedia;
    } else if (selectedResult.source === "clearbit") {
      newContent.data.clearbit = selectedResult.clearbit;
    }

    dispatch(listActions.addContent(newContent));
    dispatch(searchActions.setSelectedResult(null));
    dispatch(searchActions.setSearchQuery(""));

    toast("Added new content to the box", {
      type: "success",
    });
  };

  const handleCloseClick = () => {
    dispatch(searchActions.setSelectedResult(null));
  };

  const notPosterSwitchClick = () => {
    if (!isPosterSize) {
      setIsImageSquare(false);
    }

    setIsPosterSize(!isPosterSize);
  };

  const imageSquareSwitchClick = () => {
    if (!isImageSquare) {
      setIsPosterSize(false);
    }

    setIsImageSquare(!isImageSquare);
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
        <SearchResult info={selectedResult} notPoster={!isPosterSize} square={isImageSquare} />
      </div>

      <label className="flex items-center w-max text-sm gap-4 mt-2">
        <Tooltip
          showArrow
          color="foreground"
          placement="top"
          content={
            <span className="text-center">
              Fit images to poster size <br /> or keep as it is
            </span>
          }
        >
          <span>Poster size</span>
        </Tooltip>

        <Switch
          defaultSelected
          isSelected={isPosterSize}
          onValueChange={notPosterSwitchClick}
          classNames={{wrapper: "m-0 ml-1.5"}}
          size="sm"
        />
      </label>

      <label className="flex items-center w-max text-sm gap-4 mt-3">
        <Tooltip
          showArrow
          color="foreground"
          placement="top"
          content={
            <span className="text-center">
              Fit images to square size <br /> or keep as it is
            </span>
          }
        >
          <span>Square size</span>
        </Tooltip>

        <Switch
          defaultSelected
          isSelected={isImageSquare}
          onValueChange={imageSquareSwitchClick}
          classNames={{wrapper: "m-0"}}
          size="sm"
        />
      </label>

      <Button
        color="primary"
        variant="flat"
        fullWidth
        className="mt-4"
        onClick={handleAddToListClick}
      >
        Add to List
      </Button>
    </div>
  );
};

export default SelectedSearchResult;
