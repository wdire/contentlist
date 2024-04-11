"use client";

import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";

import Image from "next/image";
import clsx from "clsx";
import {memo, useMemo} from "react";
import {useAppSelector} from "@/store";
import {ContentMediaName, getContentMediaType, getContentSourceUrl} from "@/lib/utils/helper.utils";
import {CONTENTCARD_SIZE_CLASSES, REMEMBERED_STATES_TYPES} from "@/lib/constants";
import {Content, ContentSourceName} from "../../../lib/types/list.type";

export const useContentclassNames = ({
  isDragging = false,
  redirectSourcePage = false,
  notPoster,
  square,
  contentSize = "1x",
  isSearchResult = false,
}: {
  isDragging?: boolean;
  redirectSourcePage?: boolean;
  contentSize?: REMEMBERED_STATES_TYPES["CONTENT_SIZE"];
  notPoster: boolean | undefined;
  square: boolean | undefined;
  isSearchResult?: boolean;
}) => {
  const classNames = useMemo(() => {
    const {_1x, _2x, _3x} = CONTENTCARD_SIZE_CLASSES;
    const wrapper = clsx("content", {
      [`${CONTENTCARD_SIZE_CLASSES["min-h-"]} ${CONTENTCARD_SIZE_CLASSES["md:min-h-"]}`]:
        !isSearchResult,
      "min-h-14 max-h-[84px] w-14": isSearchResult,

      "opacity-50": isDragging,

      "cursor-pointer transition-opacity hover:opacity-75": redirectSourcePage,
      "cursor-grab": !redirectSourcePage,

      // "w-[60px] max-h-[90px] md:w-[86px] md:max-h-[129px]": !isSearchResult && contentSize === "1x",
      [`${_1x["w-"]} ${_1x["max-h-"]} ${_1x["md:w-"]} ${_1x["md:max-h-"]}`]:
        !isSearchResult && contentSize === "1x",
      [`${_2x["w-"]} ${_2x["max-h-"]} ${_2x["md:w-"]} ${_2x["md:max-h-"]}`]: contentSize === "2x",
      [`${_3x["w-"]} ${_3x["max-h-"]} ${_3x["md:w-"]} ${_3x["md:max-h-"]}`]: contentSize === "3x",
    });

    const contentName = clsx("content-name !leading-3 md:!leading-4", {
      "text-[10px] line-clamp-5": contentSize === "1x",
      "text-xs line-clamp-6": contentSize === "2x",
      "text-sm !leading-4 line-clamp-[8]": contentSize === "3x",
    });

    const contentImage = clsx("content-img", {
      [`${CONTENTCARD_SIZE_CLASSES["min-h-"]} ${CONTENTCARD_SIZE_CLASSES["md:min-h-"]}`]:
        !isSearchResult,
      "max-h-[84px]": isSearchResult,

      "aspect-square object-cover": square,
      "aspect-[2/3] object-cover": !notPoster,

      "object-contain": !square && notPoster,
    });

    const contentText = clsx("content-text", {
      [`${CONTENTCARD_SIZE_CLASSES["min-h-"]} ${CONTENTCARD_SIZE_CLASSES["md:min-h-"]}`]:
        !isSearchResult,
      "max-h-[84px]": isSearchResult,

      "aspect-square": square,

      "aspect-[2/3]": !notPoster && !square,
    });

    const contentTextSpan = clsx("text-ellipsis wordb-break-word md:text-sm", {
      "text-[10px] line-clamp-5": contentSize === "1x",
      "text-xs line-clamp-6": contentSize === "2x",
      "text-sm line-clamp-[7]": contentSize === "3x",
    });

    return {
      wrapper,
      contentName,
      contentImage,
      contentText,
      contentTextSpan,
    };
  }, [notPoster, square, contentSize, isDragging, redirectSourcePage, isSearchResult]);

  return classNames;
};

export const ContentCardMemo = memo(function ContentCardMemo({
  content,
  isDragging,
  redirectSourcePage,
}: {
  content: Content;
  isDragging: boolean;
  redirectSourcePage: boolean;
}) {
  const contentSize = useAppSelector((state) => state.list.contentSize);
  const showName = useAppSelector((state) => state.list.showName);
  const showSources = useAppSelector((state) => state.list.showSources);

  const classNames = useContentclassNames({
    contentSize,
    isDragging,
    redirectSourcePage,
    notPoster: content.data.notPoster,
    square: content.data.square,
  });

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
      {content.data.source === "text" ? (
        <div className={classNames.contentText}>
          <span className={classNames.contentTextSpan}>{content.data.name}</span>
        </div>
      ) : (
        <Image
          src={content.data.image_url}
          width={86}
          height={129}
          sizes="86px"
          alt={content.data.name}
          className={classNames.contentImage}
          unoptimized
        />
      )}

      {showSources || (showName && content.data.source !== "text") ? (
        <div className={classNames.contentName}>
          {showSources ? (
            <>
              <div className="md:text-xs leading-3 pb-1">
                <div className="font-bold">{ContentSourceName[content.data.source]}</div>
                <div>{mediaName && content.data.source !== "text" ? ` ${mediaName}` : null}</div>
              </div>
              {showName && content.data.source !== "text" ? (
                <div className="w-10 h-[1px] mb-1 bg-white" />
              ) : null}
            </>
          ) : null}
          {showName && content.data.source !== "text" ? content.data.name : null}
        </div>
      ) : null}
    </Component>
  );
});

interface Props {
  content: Content;
  isDragoverlay?: boolean;
}

const ContentCard = memo(function ContentCard({content}: Props) {
  const redirectSourcePage = useAppSelector((state) => state.list.redirectSourcePage);

  const {setNodeRef, attributes, listeners, transform, isDragging} = useSortable({
    id: content.id,
    data: {
      type: "Content",
      content,
    },
    transition: null,
    disabled: redirectSourcePage,
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Translate.toString(transform),
      }}
      {...attributes}
      {...listeners}
      className={`touch-none select-none`}
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
