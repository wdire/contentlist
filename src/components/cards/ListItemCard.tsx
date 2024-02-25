import {ArrayElement} from "@/api/lib/index.type.api";
import {ListRequestTypes} from "@/api/lib/schemas/list.schema";
import {Image, Skeleton} from "@nextui-org/react";
import clsx from "clsx";
import NImage from "next/image";
import Link from "next/link";

export const ListItemCard = ({
  list,
  isLoading,
}: {
  list: ArrayElement<NonNullable<ListRequestTypes["/list/getAll"]["response"]["data"]>>;
  isLoading?: boolean;
}) => {
  return (
    <Link
      href={`/list/${list.id}`}
      className={clsx(
        "inline-block rounded-xl overflow-hidden relative w-[calc(50%-10px)] sm:w-[167px] sm:h-[200px] transition-[transform,opacity] active:scale-95 hover:opacity-80 bg-content1",
        {
          "pointer-events-none": isLoading,
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
        src={"/assets/no-image.png"}
        priority
        isLoading={isLoading || false}
      />

      <Skeleton
        isLoaded={!isLoading}
        className="absolute min-h-[33px] bottom-0 z-10 p-3 h-auto subpixel-antialiased rounded-b-xl border-b-1  border-white/20 bg-content1/50 backdrop-blur backdrop-saturate-100 overflow-hidden py-1 shadow-small w-full"
      >
        {list.name}
      </Skeleton>
    </Link>
  );
};
