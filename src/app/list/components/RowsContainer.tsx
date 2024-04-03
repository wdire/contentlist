"use client";

import {SortableContext} from "@dnd-kit/sortable";
import React, {useMemo} from "react";
import {useAppSelector} from "@/store";
import listSelectors from "@/store/features/list/listSelectors";
import {LIST_ROWS_ID} from "@/lib/constants";
import RowItem from "./RowItem";
import ListSkeletons from "../list.skeletons";

const RowsContainer = () => {
  const rows = useAppSelector((state) => state.list.rows);
  const contentsId = useMemo(() => rows.map((col) => col.id), [rows]);
  const fetchLoading = useAppSelector(listSelectors.selectFetchLoading);

  return (
    <div className="w-full rounded-t-medium overflow-hidden">
      <div
        className="flex flex-col gap-y-0.5 overflow-hidden relative bg-background"
        id={LIST_ROWS_ID}
      >
        <SortableContext items={contentsId}>
          {!fetchLoading ? (
            rows.map((row) => <RowItem key={row.id} row={row} />)
          ) : (
            <ListSkeletons.RowsContainer />
          )}
        </SortableContext>
      </div>
    </div>
  );
};

export default RowsContainer;
