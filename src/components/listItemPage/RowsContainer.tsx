import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import React, {useMemo} from "react";
import {useAppSelector} from "@/store";
import {Skeleton} from "@nextui-org/react";
import listSelectors from "@/store/features/list/listSelectors";
import {LIST_ROWS_ID} from "@/lib/constants";
import RowItem from "./RowItem";

const RowsContainer = () => {
  const rows = useAppSelector((state) => state.list.rows);
  const contents = useAppSelector((state) => state.list.contents);
  const contentsId = useMemo(() => rows.map((col) => col.id), [rows]);
  const fetchLoading = useAppSelector(listSelectors.selectFetchLoading);

  return (
    <div className="w-full rounded-t-medium overflow-hidden">
      <div
        className="flex flex-col gap-y-0.5 overflow-hidden relative bg-background"
        id={LIST_ROWS_ID}
      >
        <SortableContext items={contentsId} strategy={verticalListSortingStrategy}>
          {!fetchLoading ? (
            rows.map((row) => (
              <RowItem
                key={row.id}
                row={row}
                contents={contents.filter((content) => content.rowId === row.id)}
              />
            ))
          ) : (
            <RowsContainerSkeleton />
          )}
        </SortableContext>
      </div>
    </div>
  );
};

export default RowsContainer;

const RowsContainerSkeleton = () => {
  const rowHead = "w-[80px] h-[60px] sm:w-[120px] sm:h-[80px] flex-shrink-0";
  const rowBody = "ml-0.5 w-full h-[60px] sm:h-[80px]";

  return (
    <>
      <div className="flex">
        <Skeleton className={rowHead} />
        <Skeleton className={rowBody} />
      </div>
      <div className="flex">
        <Skeleton className={rowHead} />
        <Skeleton className={rowBody} />
      </div>
      <div className="flex">
        <Skeleton className={rowHead} />
        <Skeleton className={rowBody} />
      </div>
      <div className="flex">
        <Skeleton className={rowHead} />
        <Skeleton className={rowBody} />
      </div>
      <div className="flex">
        <Skeleton className={rowHead} />
        <Skeleton className={rowBody} />
      </div>
    </>
  );
};
