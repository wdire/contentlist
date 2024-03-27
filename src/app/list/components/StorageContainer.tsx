"use client";

import {useMemo, useState} from "react";
import {SortableContext, useSortable} from "@dnd-kit/sortable";
import {STORAGE_ROW_ID} from "@/lib/constants";

import {useAppDispatch, useAppSelector} from "@/store";
import listSelectors, {selectContentsByRowId} from "@/store/features/list/listSelectors";
import {Button, Skeleton} from "@nextui-org/react";
import {ListState} from "@/store/features/list/listSlice.type";
import {listActions} from "@/store/features/list/listSlice";
import ContentCard from "./ContentCard";
import ContentTrashbox from "./ContentTrashbox";
import StorageSearchInput from "./StorageSearchInput";

const StorageContainer = () => {
  const fetchLoading = useAppSelector(listSelectors.selectFetchLoading);
  const storageContents = useAppSelector((state) => selectContentsByRowId(state, STORAGE_ROW_ID));
  const contentSize = useAppSelector((state) => state.list.contentSize);

  const [searchValue, setSearchValue] = useState("");

  const dispatch = useAppDispatch();

  const {setNodeRef} = useSortable({
    id: STORAGE_ROW_ID,
    data: {
      type: "Row",
    },
  });

  const contentIds = useMemo(() => {
    return storageContents.map((content) => content.id);
  }, [storageContents]);

  const storageContentsMemo = useMemo(() => {
    let contentsToRender = storageContents;

    if (searchValue) {
      contentsToRender = contentsToRender.filter((content) =>
        content.data.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
      );
    }

    if (contentsToRender.length === 0) {
      return [];
    }

    return contentsToRender.map((content) => <ContentCard key={content.id} content={content} />);
  }, [storageContents, searchValue]);

  const handleContentSizeChange = (size: ListState["contentSize"]) => {
    dispatch(listActions.setContentSize(size));
  };

  return (
    <>
      {fetchLoading ? (
        <Skeleton className="rounded-b-medium bg-content1 w-full flex flex-col gap-3 md:gap-5 p-5">
          <div className="flex flex-col gap-3 md:gap-5">
            <h2 className="text-2xl">Box</h2>
            <div className="flex flex-grow flex-wrap min-h-[90px] md:min-h-[120px]" />
          </div>
        </Skeleton>
      ) : (
        <div className="sm:rounded-b-medium sm:overflow-hidden shadow-[0_-3px_3px_-3px_rgba(255,255,255,0.3)] sm:shadow-none sticky sm:relative bottom-0 z-20">
          <div ref={setNodeRef} className="bg-content1 w-full flex flex-col sm:p-5">
            <div className="absolute -top-16 pointer-events-none"></div>
            <div className="flex gap-8 justify-between pt-5 px-3 sm:px-0 pb-2 sm:p-0">
              <div className="flex items-center gap-5">
                <h2 className="text-2xl">Box</h2>
                <StorageSearchInput setSearchValue={setSearchValue} />
              </div>
              <div className="flex items-center gap-3">
                <div className="text-sm">Content Size</div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={contentSize === "1x" ? "solid" : "flat"}
                    onPress={() => handleContentSizeChange("1x")}
                    className="min-w-0 w-8 text-sm"
                  >
                    1x
                  </Button>
                  <Button
                    size="sm"
                    variant={contentSize === "2x" ? "solid" : "flat"}
                    onPress={() => handleContentSizeChange("2x")}
                    className="min-w-0 w-8 text-sm"
                  >
                    2x
                  </Button>
                  <Button
                    size="sm"
                    variant={contentSize === "3x" ? "solid" : "flat"}
                    onPress={() => handleContentSizeChange("3x")}
                    className="min-w-0 w-8 text-sm"
                  >
                    3x
                  </Button>
                </div>
              </div>
            </div>
            <div className="w-full relative overflow-x-scroll hide-scrollbar sm:overflow-auto sm:pt-6 pb-safe">
              {storageContentsMemo.length > 0 ? (
                <div className="sm:hidden flex select-none items-end justify-center w-full pb-3 h-12 text-xs text-default-800 left-0 top-0">
                  {"< Touch here to swipe >"}
                </div>
              ) : (
                <div className="pl-4 pt-4 h-12">No matching contents</div>
              )}

              <div className="flex flex-grow sm:flex-wrap min-h-[90px] md:min-h-[120px] w-full">
                <SortableContext id={STORAGE_ROW_ID} items={contentIds}>
                  {storageContentsMemo}
                </SortableContext>
              </div>
            </div>
            <ContentTrashbox />
          </div>
        </div>
      )}
    </>
  );
};

export default StorageContainer;
