import {ApiRequestTypes} from "@/api/lib/schemas/index.schema";
import {Image, Skeleton} from "@nextui-org/react";
import clsx from "clsx";
import NImage from "next/image";
import Link from "next/link";

export const ListItemCard = ({
  list,
  isLoading,
  xScrollParent,
}: {
  list: ApiRequestTypes["/list/getHomeLists"]["types"]["list"];
  isLoading?: boolean;
  xScrollParent?: boolean;
}) => {
  return (
    <Link
      href={`/list/${list.id}`}
      className={clsx(
        "flex-shrink-0 inline-block rounded-xl overflow-hidden relative transition-[transform,opacity] active:scale-95 hover:opacity-80 bg-content1",
        {
          "pointer-events-none": isLoading,
          "w-[calc(50%-10px)] sm:w-[222px] sm:h-[266px]": !xScrollParent,
          "w-[140px] sm:w-[222px] sm:h-[266px]": xScrollParent,
        },
      )}
    >
      <Image
        as={NImage}
        width={300}
        height={300}
        alt={`${list.name} image`}
        className="object-cover object-bottom w-full rounded-none pointer-events-none aspect-square"
        classNames={{
          wrapper: "rounded-none",
        }}
        src={
          list.cloudinaryImage?.publicId
            ? `https://res.cloudinary.com/dgib2iezn/image/upload/v${list.cloudinaryImage.version}/${list.cloudinaryImage.publicId}`
            : "/assets/no-image.png"
        }
        priority
        isLoading={isLoading || false}
      />

      <Skeleton
        isLoaded={!isLoading}
        className="absolute bottom-0 z-10 p-3 h-auto subpixel-antialiased rounded-b-xl border-b-1  border-white/20 bg-content1/50 backdrop-blur backdrop-saturate-100 overflow-hidden py-1 shadow-small w-full"
        classNames={{
          content: "min-h-[35px] flex items-center",
        }}
      >
        {list.name}
      </Skeleton>
    </Link>
  );
};
