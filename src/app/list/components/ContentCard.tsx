"use client";

import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";

import Image from "next/image";
import clsx from "clsx";
import {memo, useMemo} from "react";
import {useAppSelector} from "@/store";
import {ContentMediaName, getContentMediaType} from "@/lib/utils/helper.utils";
import {Content, ContentSourceName} from "../../../lib/types/list.type";

interface Props {
  content: Content;
  dragOverlay?: boolean;
}

const ContentCard = memo(function ContentCard({content, dragOverlay}: Props) {
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
    "w-[60px] max-h-[90px] md:w-[80px] md:max-h-[120px] overflow-hidden items-center select-none touch-none",
    "flex text-left cursor-grab relative content",
    {
      "opacity-50": isDragging,
      "h-full": dragOverlay,
    },
  );

  const contentNameClassName = clsx(
    "absolute left-0 bottom-0 break-words w-full max-w-full text-ellipsis bg-gradient-to-t from-80% from-black/50",
    "text-[10px] md:text-sm line-clamp-4 md:line-clamp-5 max-h-full pt-2 !leading-3 md:!leading-[18px]",
  );

  const contentImageClassname = clsx(
    "w-full min-h-[50px] pointer-events-none block select-none max-h-full",
    {
      "h-auto object-contain": content?.data?.notPoster,
      "h-full object-cover": !content?.data?.notPoster,
    },
  );

  const showName = useAppSelector((state) => state.list.showName);
  const showSources = useAppSelector((state) => state.list.showSources);

  const mediaName = useMemo(() => {
    const mediaType = getContentMediaType(content.data);
    return mediaType && ContentMediaName[mediaType];
  }, [content.data]);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={wrapperClassName}
      data-contentcard="true"
    >
      <Image
        src={`/api/image-proxy?url=${content.data.image_url}`}
        width={80}
        height={120}
        sizes="80px"
        alt={content.data.name}
        className={contentImageClassname}
        unoptimized
      />
      {showName || showSources ? (
        <div className={contentNameClassName}>
          {showSources ? (
            <>
              <div className="md:text-xs leading-3 pb-1">
                <div className="font-bold">{ContentSourceName[content.data.source]}</div>
                <div>{mediaName ? ` ${mediaName}` : null}</div>
              </div>
              {showName ? <div className="w-10 h-[1px] mb-1 bg-white" /> : null}
            </>
          ) : null}

          {showName ? content.data.name : null}
        </div>
      ) : null}
    </div>
  );
});

export default ContentCard;
