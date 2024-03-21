"use client";

import {useMemo} from "react";
import {SortableContext, useSortable} from "@dnd-kit/sortable";
import {STORAGE_ROW_ID} from "@/lib/constants";

import {useAppSelector} from "@/store";
import listSelectors from "@/store/features/list/listSelectors";
import {Skeleton} from "@nextui-org/react";
import {shallowEqual} from "react-redux";
import ContentCard from "./ContentCard";
import ContentTrashbox from "./ContentTrashbox";

const StorageContainer = () => {
  const fetchLoading = useAppSelector(listSelectors.selectFetchLoading);
  const storageContents = useAppSelector(
    (state) => state.list.contents.filter((content) => content.rowId === STORAGE_ROW_ID),
    shallowEqual,
  );

  const {setNodeRef} = useSortable({
    id: STORAGE_ROW_ID,
    data: {
      type: "Row",
    },
  });

  const contentIds = useMemo(() => {
    return storageContents.map((content) => content.id);
  }, [storageContents]);

  return (
    <Skeleton isLoaded={!fetchLoading} className="rounded-b-medium">
      <div ref={setNodeRef} className="bg-content1 w-full flex flex-col gap-3 md:gap-5 p-5">
        <div className="flex">
          <h2 className="text-2xl">Box</h2>
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
