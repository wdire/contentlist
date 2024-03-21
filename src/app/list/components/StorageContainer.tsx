"use client";

import {useMemo, useRef} from "react";
import {SortableContext, useSortable} from "@dnd-kit/sortable";
import {STORAGE_ROW_ID} from "@/lib/constants";

import {useAppDispatch, useAppSelector} from "@/store";
import listSelectors from "@/store/features/list/listSelectors";
import {Button, Skeleton} from "@nextui-org/react";
import {shallowEqual} from "react-redux";
import {ListState} from "@/store/features/list/listSlice.type";
import {listActions} from "@/store/features/list/listSlice";
import ContentCard from "./ContentCard";
import ContentTrashbox from "./ContentTrashbox";

const StorageContainer = () => {
  const fetchLoading = useAppSelector(listSelectors.selectFetchLoading);
  const storageContents = useAppSelector(
    (state) => state.list.contents.filter((content) => content.rowId === STORAGE_ROW_ID),
    shallowEqual,
  );
  const contentSize = useAppSelector((state) => state.list.contentSize);

  const dispatch = useAppDispatch();

  const {setNodeRef} = useSortable({
    id: STORAGE_ROW_ID,
    data: {
      type: "Row",
    },
  });

  const storageRef = useRef<HTMLDivElement | null>(null);

  const contentIds = useMemo(() => {
    return storageContents.map((content) => content.id);
  }, [storageContents]);

  const handleContentSizeChange = (size: ListState["contentSize"]) => {
    dispatch(listActions.setContentSize(size));

    setTimeout(() => {
      if (storageRef.current) {
        storageRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 400);
  };

  return (
    <Skeleton isLoaded={!fetchLoading} className="rounded-b-medium">
      <div
        ref={setNodeRef}
        className="bg-content1 w-full flex flex-col gap-3 md:gap-5 sm:p-5 relative"
      >
        <div className="absolute -top-16 pointer-events-none" ref={storageRef}></div>
        <div className="flex gap-8 justify-between pt-5 px-5 pb-2 sm:p-0">
          <h2 className="text-2xl">Box</h2>
          <div className="flex items-center gap-3">
            <div className="text-sm">Content Size</div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={contentSize === "1x" ? "solid" : "flat"}
                onClick={() => handleContentSizeChange("1x")}
                className="min-w-0 w-8 text-sm"
              >
                1x
              </Button>
              <Button
                size="sm"
                variant={contentSize === "2x" ? "solid" : "flat"}
                onClick={() => handleContentSizeChange("2x")}
                className="min-w-0 w-8 text-sm"
              >
                2x
              </Button>
              <Button
                size="sm"
                variant={contentSize === "3x" ? "solid" : "flat"}
                onClick={() => handleContentSizeChange("3x")}
                className="min-w-0 w-8 text-sm"
              >
                3x
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-grow flex-wrap min-h-[90px] md:min-h-[120px]">
          <SortableContext id={STORAGE_ROW_ID} items={contentIds}>
            {storageContents.map((content) => (
              <ContentCard key={content.id} content={content} />
            ))}
          </SortableContext>
        </div>
        <ContentTrashbox />
      </div>
    </Skeleton>
  );
};

export default StorageContainer;
