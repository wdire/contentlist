"use client";

import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";

import Image from "next/image";
import clsx from "clsx";
import {memo} from "react";
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
    "w-[80px] overflow-hidden max-h-[150px] min-h-[90px] items-center",
    "flex text-left cursor-grab relative content",
    {
      "opacity-50": isDragging,
    },
  );

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className={wrapperClassName}>
      <Image
        src={content.data.image_url}
        width={80}
        height={120}
        alt={content.data.name}
        className="object-contain w-full h-full pointer-events-none block select-none"
      />
    </div>
  );
});

export default ContentCard;
