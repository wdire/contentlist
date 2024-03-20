import {ContentInfoType} from "@/lib/types/list.type";
import {ContentMediaName, getContentMediaType} from "@/lib/utils/helper.utils";
import Image from "next/image";

type SearchResultProps = {
  info: ContentInfoType;
  onClick?: () => void;
  notPoster?: PrismaJson.ContentType["notPoster"];
};

const SearchResult = ({info, onClick, notPoster = undefined}: SearchResultProps) => {
  const mediaType = getContentMediaType(info);

  return (
    <div className="flex justify-between items-center" aria-label={info.name} onClick={onClick}>
      <div className="flex gap-2 max-w-full items-center">
        <Image
          alt={info.name}
          className={`flex-shrink-0 max-h-[84px] ${notPoster ? "object-contain" : "object-cover h-[84px]"}`}
          width={56}
          height={84}
          src={info.image_url}
          aria-label={info.name}
          unoptimized
        />
        <div className="flex basis-full flex-shrink flex-col  break-words">
          <span className="text-small text-wrap break-words">{info.name}</span>
          <span className="text-tiny text-default-400 capitalize">
            {mediaType && ContentMediaName[mediaType]}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
