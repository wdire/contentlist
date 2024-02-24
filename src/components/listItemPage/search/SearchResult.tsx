import {SearchSelectionType} from "@/lib/types/search.type";
import {Avatar} from "@nextui-org/react";

const SearchResult = ({info, onClick}: {info: SearchSelectionType; onClick?: () => void}) => {
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
        <div className="flex flex-col">
          <span className="text-small text-wrap">{info.name}</span>
          <span className="text-tiny text-default-400 capitalize">{info.media_type}</span>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
