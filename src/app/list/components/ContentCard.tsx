"use client";

import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";

import Image from "next/image";
import clsx from "clsx";
import {memo, useMemo} from "react";
import {useAppSelector} from "@/store";
import {ContentMediaName, getContentMediaType, getContentSourceUrl} from "@/lib/utils/helper.utils";
import {Content, ContentSourceName} from "../../../lib/types/list.type";

interface Props {
  content: Content;
}

const ContentCardMemo = memo(function ContentCardMemo({
  content,
  isDragging,
  redirectSourcePage,
}: Props & {isDragging: boolean; redirectSourcePage: boolean}) {
  const contentSize = useAppSelector((state) => state.list.contentSize);
  const showName = useAppSelector((state) => state.list.showName);
  const showSources = useAppSelector((state) => state.list.showSources);

  const classNames = useMemo(() => {
    const wrapper = clsx("content", {
      "opacity-50": isDragging,

      "h-full": !content?.data?.notPoster,

      "cursor-pointer transition-opacity hover:opacity-75": redirectSourcePage,
      "cursor-grab": !redirectSourcePage,

      "w-[60px] max-h-[90px] md:w-[86px] md:max-h-[129px]": contentSize === "1x",
      "w-[84px] max-h-[126px] md:w-[100px] md:max-h-[150px]": contentSize === "2x",
      "w-[126px] max-h-[189px] md:w-[116px] md:max-h-[174px]": contentSize === "3x",
    });

    const contentName = clsx(
      "absolute left-0 bottom-0 wordb-break-word w-full max-w-full text-ellipsis bg-gradient-to-t from-80% from-black/50 pt-2",
      "max-h-full !leading-3 md:text-sm md:!leading-4",
      {
        "text-[10px] line-clamp-5": contentSize === "1x",
        "text-xs line-clamp-6": contentSize === "2x",
        "text-sm !leading-4 line-clamp-[8]": contentSize === "3x",
      },
    );

    const contentImage = clsx(
      "w-full min-h-[60px] pointer-events-none block select-none max-h-full",
      {
        "h-auto object-contain": content?.data?.notPoster,
        "h-full object-cover": !content?.data?.notPoster,

        "aspect-square": content?.data?.square,
        "aspect-[2/3]": !content?.data?.square,
      },
    );

    return {
      wrapper,
      contentName,
      contentImage,
    };
  }, [
    content?.data?.notPoster,
    content?.data?.square,
    contentSize,
    isDragging,
    redirectSourcePage,
  ]);

  const mediaName = useMemo(() => {
    const mediaType = getContentMediaType(content.data);
    return mediaType && ContentMediaName[mediaType];
  }, [content.data]);

  const sourceUrl = useMemo(() => {
    if (redirectSourcePage) {
      return getContentSourceUrl(content.data);
    }
    return null;
  }, [content.data, redirectSourcePage]);

  const Component = redirectSourcePage ? "a" : "div";

  return (
    <Component
      className={classNames.wrapper}
      {...(redirectSourcePage && sourceUrl ? {href: sourceUrl, target: "_blank"} : {})}
    >
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
    </Component>
  );
});

const ContentCard = memo(function ContentCard({content}: Props) {
  const redirectSourcePage = useAppSelector((state) => state.list.redirectSourcePage);

  const {setNodeRef, attributes, listeners, transform, transition, isDragging} = useSortable({
    id: content.id,
    data: {
      type: "Content",
      content,
    },
    disabled: redirectSourcePage,
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
      className={content.data.notPoster ? "self-center" : ""}
      data-contentcard="true"
    >
      <ContentCardMemo
        content={content}
        redirectSourcePage={redirectSourcePage}
        isDragging={isDragging}
      />
    </div>
  );
});

export default ContentCard;
