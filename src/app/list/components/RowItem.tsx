"use client";

import {
  AnimateLayoutChanges,
  SortableContext,
  defaultAnimateLayoutChanges,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {memo, useMemo} from "react";
import dynamic from "next/dynamic";
import {Row, Content} from "../../../lib/types/list.type";
import RowOptionsPopover from "./RowOptionsPopover";

const ContentCard = dynamic(() => import("./ContentCard"));

const animateLayoutChanges: AnimateLayoutChanges = (args) =>
  defaultAnimateLayoutChanges({...args, wasDragging: true});

interface Props {
  row: Row;
  contents: Content[];
}

const RowItem = memo(function RowItem({row, contents}: Props) {
  const contentIds = useMemo(() => {
    return contents.map((content) => content.id);
  }, [contents]);

  const {setNodeRef, transform, transition, isDragging} = useSortable({
    id: row.id,
    data: {
      type: "Row",
      row,
    },
    animateLayoutChanges,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className={"w-full flex bg-content1 relative"}>
      <div
        style={{
          backgroundColor: `var(--rowColor-${row.color})`,
        }}
        className={
          "bg-opacity-50 w-[80px] md:w-[120px] flex-shrink-0 text-md p-3 font-bold flex items-center justify-center relative"
        }
      >
        <div className="flex gap-2 text-zinc-900 font-normal text-xs md:text-base break-words text-center">
          {row.title}
        </div>
      </div>
      <div className="flex w-full">
        <div className="flex flex-grow flex-wrap min-h-[60px] md:min-h-[80px] pl-0.5">
          <SortableContext items={contentIds} strategy={rectSortingStrategy}>
            {contents.map((content) => (
              <ContentCard key={content.id} content={content} />
            ))}
          </SortableContext>
        </div>
        <div className="flex justify-center items-center w-10">
          <RowOptionsPopover row={row} />
        </div>
      </div>
    </div>
  );
});

export default RowItem;
