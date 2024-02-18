import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import React, {useMemo} from "react";
import {useAppSelector} from "@/store";
import {Skeleton} from "@nextui-org/react";
import listSelectors from "@/store/features/list/listSelectors";
import clsx from "clsx";
import {LIST_ROWS_ID} from "@/lib/constants";
import RowItem from "./RowItem";

const RowsContainer = () => {
  const rows = useAppSelector((state) => state.list.rows);
  const contents = useAppSelector((state) => state.list.contents);
  const contentsId = useMemo(() => rows.map((col) => col.id), [rows]);
  const fetchLoading = useAppSelector(listSelectors.selectFetchLoading);

  return (
    <Skeleton
      isLoaded={!fetchLoading}
      className={clsx("w-full rounded-t-medium", {
        "min-h-[300px]": fetchLoading,
      })}
    >
      <div
        className="flex flex-col gap-y-0.5 overflow-hidden relative bg-background"
        id={LIST_ROWS_ID}
      >
        <SortableContext items={contentsId} strategy={verticalListSortingStrategy}>
          {rows.map((row) => (
            <RowItem
              key={row.id}
              row={row}
              contents={contents.filter((content) => content.rowId === row.id)}
            />
          ))}
        </SortableContext>
      </div>
    </Skeleton>
  );
};

export default RowsContainer;
