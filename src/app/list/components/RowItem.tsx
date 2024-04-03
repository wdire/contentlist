"use client";

import {SortableContext, useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {memo, useMemo, useRef} from "react";
import {useAppSelector} from "@/store";
import {makeSelectContentsByRowId} from "@/store/features/list/listSelectors";
import {Row} from "../../../lib/types/list.type";
import RowOptionsPopover from "./RowOptionsPopover";
import ContentCard from "./ContentCard";

interface Props {
  row: Row;
}

const RowItemMemo = memo(function RowItemMemo({row}: Props) {
  const selectContentsByRowId = useRef(makeSelectContentsByRowId(row.id));

  const contents = useAppSelector((state) => selectContentsByRowId.current(state));

  const contentIds = useMemo(() => {
    return contents.map((content) => content.id);
  }, [contents]);

  const contentsMemo = useMemo(() => {
    return contents.map((content) => <ContentCard key={content.id} content={content} />);
  }, [contents]);

  return (
    <>
      <div
        style={{
          backgroundColor: `var(--rowColor-${row.color})`,
        }}
        className={
          "bg-opacity-50 w-[80px] md:w-[120px] flex-shrink-0 text-md py-3 sm:px-1.5 px-0.5 font-bold flex items-center justify-center relative"
        }
      >
        <div className="flex gap-2 text-zinc-900 font-normal text-xs md:text-base wordb-break-word text-center">
          {row.title}
        </div>
      </div>
      <div className="flex w-full">
        <div className="row-items flex flex-grow flex-wrap min-h-[60px] md:min-h-[86px] pl-0.5">
          <SortableContext id={`${row.id}`} items={contentIds}>
            {contentsMemo}
          </SortableContext>
        </div>
        <div className="flex justify-center items-center w-10 sm:w-14">
          <RowOptionsPopover row={row} />
        </div>
      </div>
    </>
  );
});

const RowItem = memo(function RowItem({row}: Props) {
  const {setNodeRef, transform, transition} = useSortable({
    id: row.id,
    data: {
      type: "Row",
      row,
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div ref={setNodeRef} style={style} className={"w-full flex bg-content1 relative"}>
      <RowItemMemo row={row} />
    </div>
  );
});

export default RowItem;
