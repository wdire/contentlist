"use client";

import {getListCloudinaryImage} from "@/lib/utils/helper.utils";
import {Skeleton} from "@nextui-org/react";
import {Prisma} from "@prisma/client";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

export const ListItemCard = ({
  list,
  isLoading,
  xScrollParent,
  isLocal,
}: {
  list: Prisma.ListGetPayload<{
    select: {
      id: true;
      name: true;
      cloudinaryImage: {
        select: {
          publicId: true;
          version: true;
        };
      };
    };
  }>;
  isLoading?: boolean;
  xScrollParent?: boolean;
  isLocal?: boolean;
}) => {
  return (
    <Link
      href={`/list/${list.id}${isLocal ? "?local=true" : ""}`}
      className={clsx(
        "flex-shrink-0 inline-block rounded-xl overflow-hidden relative transition-[transform,opacity] active:scale-95 hover:opacity-80 bg-content1",
        {
          "pointer-events-none": isLoading,
          "w-[calc(50%-10px)] pb-[33px] sm:pb-0 sm:w-[222px] sm:h-[266px]": !xScrollParent,
          "w-[155px] h-[188px] sm:w-[222px] sm:h-[266px]": xScrollParent,
        },
      )}
    >
      {isLoading ? (
        <Skeleton className="w-full h-full aspect-square" />
      ) : (
        <Image
          width={222}
          height={266}
          alt={`${list.name} list image`}
          className="object-cover object-bottom w-full rounded-none pointer-events-none aspect-square"
          src={getListCloudinaryImage({
            publicId: list.cloudinaryImage?.publicId,
            version: list.cloudinaryImage?.version,
          })}
          priority
          unoptimized
        />
      )}

      <Skeleton
        isLoaded={!isLoading}
        className="absolute bottom-0 text-sm sm:text-base z-10 py-1 px-2.5 sm:px-3 sm:py-1 h-auto subpixel-antialiased rounded-b-xl border-b-1 border-white/20 !bg-content1 backdrop-blur backdrop-saturate-100 overflow-hidden shadow-small w-full"
        classNames={{
          content: "min-h-[24px] sm:min-h-[35px] flex items-center",
        }}
      >
        {list.name}
      </Skeleton>
    </Link>
  );
};
