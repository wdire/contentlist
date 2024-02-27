"use client";

import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";

import Image from "next/image";
import clsx from "clsx";
import {memo} from "react";
import {useAppSelector} from "@/store";
import {Content} from "../../lib/types/list.type";

interface Props {
  content: Content;
}

const ContentCard = memo(function ContentCard({content}: Props) {
  const {setNodeRef, attributes, listeners, transform, transition, isDragging} = useSortable({
    id: content.id,
    data: {
      type: "Content",
      content,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const wrapperClassName = clsx(
    "w-[50px] md:w-[80px] overflow-hidden max-h-[150px] items-center select-none touch-none",
    "flex text-left cursor-grab relative content",
    {
      "opacity-50": isDragging,
    },
  );

  const showName = useAppSelector((state) => state.list.showName);

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className={wrapperClassName}>
      <Image
        src={content.data.image_url}
        width={80}
        height={120}
        sizes="200px"
        alt={content.data.name}
        className="object-cover w-full h-full pointer-events-none block select-none"
        priority
      />
      {showName && (
        <div className="absolute left-0 bottom-0 text-[10px] sm:text-sm break-words w-full max-w-full bg-gradient-to-t from-black/50 pt-1">
          {content.data.name}
        </div>
      )}
    </div>
  );
});

export default ContentCard;
