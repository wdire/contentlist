import {useAppSelector} from "@/store";
import UpdateThumbnail from "./UpdateThumbnail";
import CreateImage from "./CreateImage";

const ListImages = () => {
  const isListOwner = useAppSelector((state) => state.list.info.isListOwner);

  return (
    <div className="pb-2.5">
      <div className="text-base mb-2">Preview</div>
      <CreateImage />
      {isListOwner ? (
        <>
          <div className="text-base mb-2 mt-4">Thumbnail</div>
          <UpdateThumbnail />
        </>
      ) : null}
    </div>
  );
};

export default ListImages;
