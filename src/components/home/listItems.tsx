"use client";

import {useGetAllQuery} from "@/services/listApi";
import Link from "next/link";

import {ListRequestTypes} from "@/api/lib/schemas/list.schema";
import {ArrayElement} from "@/api/lib/index.type.api";
import NImage from "next/image";
import {Image, Skeleton} from "@nextui-org/react";
import clsx from "clsx";
import SectionContainer from "../common/SectionContainer";

const ListItemCard = ({
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
        "inline-block rounded-xl overflow-hidden relative w-[calc(50%-10px)] sm:w-[176px] sm:h-[200px] transition-[transform,opacity] active:scale-95 hover:opacity-80 bg-content1",
        {
          "pointer-events-none": isLoading,
        },
      )}
    >
      <Image
        as={NImage}
        width={300}
        height={300}
        alt={list.name}
        className="object-cover object-bottom w-full rounded-none pointer-events-none aspect-square"
        src={"/assets/no-image.png"}
        priority
        isLoading={isLoading || false}
      />

      <Skeleton
        isLoaded={!isLoading}
        className="absolute min-h-[30px] bottom-0 z-10 p-3 h-auto subpixel-antialiased rounded-b-xl border-b-1  border-white/20 bg-content1/50 backdrop-blur backdrop-saturate-100 overflow-hidden py-1 shadow-small w-full"
      >
        {list.name}
      </Skeleton>
    </Link>
  );
};

const ListItems = () => {
  const {data, isFetching} = useGetAllQuery();

  return (
    <>
      <SectionContainer className="pt-11">
        <h2 className="text-2xl mb-4">Latest Lists</h2>

        <div className="flex gap-5 flex-wrap">
          {!isFetching
            ? data?.data?.map((list, index) => <ListItemCard list={list} key={index} />)
            : [1, 2, 3, 4, 5, 6].map((s) => (
                <ListItemCard list={{id: 0, name: ""}} key={s} isLoading />
              ))}
        </div>
      </SectionContainer>
    </>
  );
};

export default ListItems;
