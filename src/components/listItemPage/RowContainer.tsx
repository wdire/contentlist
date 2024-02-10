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

import {Skeleton} from "@nextui-org/react";
import {useAppSelector} from "@/store";
import listSelectors from "@/store/features/list/listSelectors";
import {Row, Content} from "../../lib/types/list.type";
import ContentCard from "./ContentCard";

const animateLayoutChanges: AnimateLayoutChanges = (args) =>
  defaultAnimateLayoutChanges({...args, wasDragging: true});

interface Props {
  row: Row;
  contents: Content[];
}

const RowContainer = memo(function RowContainer({row, contents}: Props) {
  const fetchLoading = useAppSelector(listSelectors.selectFetchLoading);

  const contentIds = useMemo(() => {
    return contents.map((content) => content.id);
  }, [contents]);

  const {setNodeRef, attributes, listeners, transform, transition, isDragging} = useSortable({
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
    <div ref={setNodeRef} style={style} className={"w-[900px] flex bg-content1 relative"}>
      <Skeleton
        isLoaded={!fetchLoading}
        className="w-full h-full absolute pointer-events-none"
      ></Skeleton>
      <div
        {...attributes}
        {...listeners}
        style={{
          backgroundColor: `var(--rowColor-${row.color})`,
        }}
        className={
          "w-[110px] flex-shrink-0 text-md cursor-grab p-3 font-bold flex items-center justify-center"
        }
      >
        <div className="flex gap-2 text-zinc-900 font-normal text-lg">{row.title}</div>
      </div>

      {/* Row content container */}
      <div className="flex flex-grow flex-wrap gap-2 min-h-[80px] m-2">
        <SortableContext items={contentIds} strategy={rectSortingStrategy}>
          {contents.map((content) => (
            <ContentCard key={content.id} content={content} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
});

export default RowContainer;
