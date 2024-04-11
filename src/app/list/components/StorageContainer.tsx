"use client";

import {memo, useEffect, useMemo, useRef, useState} from "react";
import {
  horizontalListSortingStrategy,
  rectSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import {CONTENTCARD_SIZE_CLASSES, STORAGE_ROW_ID} from "@/lib/constants";
import {useAppDispatch, useAppSelector} from "@/store";
import listSelectors, {makeSelectContentsByRowId} from "@/store/features/list/listSelectors";
import {Button} from "@nextui-org/react";
import {ListState} from "@/store/features/list/listSlice.type";
import {listActions} from "@/store/features/list/listSlice";
import useIsMobile from "@/lib/hooks/useIsMobile";
import {toast} from "react-toastify";
import ContentCard from "./ContentCard";
import ContentTrashbox from "./ContentTrashbox";
import StorageSearchInput from "./StorageSearchInput";
import ListSkeletons from "../list.skeletons";

const StorageContainerMemo = memo(function StorageContainermemo() {
  const selectContentsByRowId = useRef(makeSelectContentsByRowId(STORAGE_ROW_ID));
  const storageContents = useAppSelector((state) => selectContentsByRowId.current(state));
  const contentSize = useAppSelector((state) => state.list.contentSize);
  const nowAddedNewItem = useAppSelector((state) => state.list.nowAddedNewItem);

  const [searchValue, setSearchValue] = useState("");

  const isMobile = useIsMobile();

  const boxScrollToRef = useRef<HTMLDivElement>(null);
  const storageRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

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
    if (!isMobile) {
      setTimeout(() => {
        boxScrollToRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 500);
    }
  };

  const strategy = useMemo(() => {
    return isMobile ? horizontalListSortingStrategy : rectSortingStrategy;
  }, [isMobile]);

  useEffect(() => {
    if (nowAddedNewItem) {
      toast(
        () => {
          return (
            <>
              Added new content to the box.
              {storageRef.current ? (
                <div
                  onClick={() => {
                    if (isMobile) {
                      storageRef.current?.scrollTo({
                        behavior: "smooth",
                        left: storageRef.current.scrollWidth - storageRef.current.clientWidth,
                      });
                    } else {
                      storageRef.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "end",
                      });
                    }
                  }}
                  className="text-primary transition-opacity hover:opacity-75"
                >
                  {" "}
                  Want to go there?
                </div>
              ) : null}
            </>
          );
        },
        {
          type: "success",
          toastId: "new_content",
        },
      );
    }
  }, [nowAddedNewItem, isMobile]);

  return (
    <>
      <div ref={boxScrollToRef} className="w-0 h-0 invisible -z-30 absolute -top-28" />
      <div className="flex gap-8 justify-between pt-5 px-3 pb-2 sm:p-0">
        <div className="flex items-center gap-5">
          <h2 className="text-2xl">Box</h2>
          <StorageSearchInput setSearchValue={setSearchValue} />
        </div>
        <div className="flex items-center gap-3">
          <div className="max-[330px]:text-xs text-sm break-keep">Content Size</div>
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
      <div
        ref={storageRef}
        className="w-full relative overflow-x-scroll hide-scrollbar sm:overflow-auto sm:pt-6 pb-safe"
      >
        {storageContentsMemo.length > 0 ? (
          <div className="sm:hidden flex select-none items-end justify-center w-full pb-3 h-12 text-xs text-default-800 left-0 top-0">
            {"< Touch here to swipe >"}
          </div>
        ) : (
          <div className="pl-3 pt-4 sm:p-0 h-12 absolute">
            {searchValue ? "No matching contents" : "No contents"}
          </div>
        )}

        <div
          className={`flex flex-grow sm:flex-wrap w-full sm:overflow-y-auto pt-0 ${CONTENTCARD_SIZE_CLASSES["min-h-"]} ${CONTENTCARD_SIZE_CLASSES["md:min-h-"]}`}
        >
          <SortableContext id={STORAGE_ROW_ID} items={contentIds} strategy={strategy}>
            {storageContentsMemo}
          </SortableContext>
        </div>
      </div>
      <ContentTrashbox />
    </>
  );
});

const StorageContainer = () => {
  const {setNodeRef} = useSortable({
    id: STORAGE_ROW_ID,
    data: {
      type: "Row",
    },
  });

  const fetchLoading = useAppSelector(listSelectors.selectFetchLoading);

  return (
    <>
      {fetchLoading ? (
        <ListSkeletons.Box />
      ) : (
        <div
          ref={setNodeRef}
          className="sm:rounded-b-medium sm:overflow-hidden shadow-[0_-3px_3px_-3px_rgba(255,255,255,0.3)] sm:shadow-none sticky sm:relative bottom-0 z-10"
        >
          <div className="bg-content1 w-full flex flex-col sm:p-5">
            <StorageContainerMemo />
          </div>
        </div>
      )}
    </>
  );
};

export default StorageContainer;
