import {ContentInfoType} from "@/lib/types/list.type";
import {ContentMediaName, getContentMediaType} from "@/lib/utils/helper.utils";
import Image from "next/image";
import {useContentclassNames} from "../ContentCard";

type SearchResultProps = {
  info: ContentInfoType;
  onClick?: () => void;
  notPoster?: PrismaJson.ContentType["notPoster"];
  square?: PrismaJson.ContentType["square"];
  existingContent?: boolean;
};

const SearchResult = ({
  info,
  onClick,
  notPoster = undefined,
  square = undefined,
  existingContent = false,
}: SearchResultProps) => {
  const mediaType = getContentMediaType(info);

  const classNames = useContentclassNames({
    notPoster,
    square,
    isSearchResult: info.source !== "text",
  });

  return (
    <div
      className="flex justify-between items-center w-full"
      aria-label={info.name}
      onClick={onClick}
    >
      <div className="flex gap-2 max-w-full items-center w-full">
        <div className={classNames.wrapper}>
          {info.source === "text" ? (
            <div className={`${classNames.contentText}`}>
              <span className={classNames.contentTextSpan}>{info.name}</span>
            </div>
          ) : (
            <Image
              alt={info.name}
              className={classNames.contentImage}
              width={56}
              height={84}
              src={info.image_url}
              aria-label={info.name}
              unoptimized
            />
          )}
        </div>

        <div className="flex basis-full flex-shrink flex-col">
          <span className="text-small text-wrap wordb-break-word">{info.name}</span>
          <span className="text-tiny text-default-400 capitalize">
            {mediaType && ContentMediaName[mediaType]}
          </span>
          {existingContent ? <div className="italic">Already in List</div> : null}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
