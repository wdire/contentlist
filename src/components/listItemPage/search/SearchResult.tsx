import {ContentInfoType} from "@/lib/types/list.type";
import {contentMediaName} from "@/lib/utils/helper.utils";
import {Avatar} from "@nextui-org/react";

const SearchResult = ({info, onClick}: {info: ContentInfoType; onClick?: () => void}) => {
  return (
    <div className="flex justify-between items-center" aria-label={info.name} onClick={onClick}>
      <div className="flex gap-2 max-w-full items-center">
        <Avatar
          alt={info.name}
          className="flex-shrink-0"
          size="lg"
          radius="none"
          src={info.image_url}
          aria-label={info.name}
        />
        <div className="flex basis-full flex-shrink flex-col  break-words">
          <span className="text-small text-wrap break-words">{info.name}</span>
          <span className="text-tiny text-default-400 capitalize">
            {contentMediaName[info.media]}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
