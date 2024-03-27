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
}

const ContentCardMemo = memo(function ContentCardMemo({
  content,
  isDragging,
}: Props & {isDragging: boolean}) {
  const contentSize = useAppSelector((state) => state.list.contentSize);
  const showName = useAppSelector((state) => state.list.showName);
  const showSources = useAppSelector((state) => state.list.showSources);

  const classNames = useMemo(() => {
    const wrapper = clsx("content", {
      "opacity-50": isDragging,

      "w-[60px] max-h-[90px] md:w-[87px] md:max-h-[131px]": contentSize === "1x",
      "w-[83px] max-h-[125px] md:w-[100px] md:max-h-[150px]": contentSize === "2x",
      "w-[125px] max-h-[188px] md:w-[117px] md:max-h-[176px]": contentSize === "3x",
    });

    const contentName = clsx(
      "absolute left-0 bottom-0 wordb-break-word w-full max-w-full text-ellipsis bg-gradient-to-t from-80% from-black/50",
      "text-[10px] md:text-sm max-h-full pt-2 !leading-3 md:!leading-[18px]",
      {
        "line-clamp-4 md:line-clamp-5": contentSize === "1x" || contentSize === "2x",
        "line-clamp-[8]": contentSize === "3x",
      },
    );

    const contentImage = clsx(
      "w-full min-h-[60px] pointer-events-none block select-none max-h-full",
      {
        "h-auto object-contain": content?.data?.notPoster,
        "h-full object-cover": !content?.data?.notPoster,
      },
    );

    return {
      wrapper,
      contentName,
      contentImage,
    };
  }, [content?.data?.notPoster, contentSize, isDragging]);

  const mediaName = useMemo(() => {
    const mediaType = getContentMediaType(content.data);
    return mediaType && ContentMediaName[mediaType];
  }, [content.data]);

  return (
    <div className={classNames.wrapper}>
      <Image
        src={content.data.image_url}
        width={84}
        height={126}
        sizes="84px"
        alt={content.data.name}
        className={classNames.contentImage}
        unoptimized
      />
      {showName || showSources ? (
        <div className={classNames.contentName}>
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

const ContentCard = memo(function ContentCard({content}: Props) {
  const {setNodeRef, attributes, listeners, transform, transition, isDragging} = useSortable({
    id: content.id,
    data: {
      type: "Content",
      content,
    },
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        transition,
        transform: CSS.Transform.toString(transform),
      }}
      {...attributes}
      {...listeners}
      data-contentcard="true"
      className="self-center"
    >
      <ContentCardMemo content={content} isDragging={isDragging} />
    </div>
  );
});

export default ContentCard;
