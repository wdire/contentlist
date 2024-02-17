"use client";

import {useGetAllQuery} from "@/services/listApi";
import Link from "next/link";

import {Image} from "@nextui-org/react";
import NImage from "next/image";
import SectionContainer from "../common/SectionContainer";

const ListItems = () => {
  const {data, isFetching} = useGetAllQuery();

  return (
    <>
      <SectionContainer className="pt-11">
        <h2 className="text-2xl mb-4">Latest Lists</h2>
        <div className="flex gap-5 flex-wrap">
          {!isFetching &&
            data?.data?.map((list, index) => (
              <Link
                href={`/list/${list.id}`}
                key={index}
                className="rounded-xl overflow-hidden relative w-[calc(50%-10px)] sm:w-[176px] sm:h-[200px] transition-[transform,opacity] active:scale-95 hover:opacity-80 bg-content1"
              >
                <Image
                  as={NImage}
                  shadow="sm"
                  radius="lg"
                  width={300}
                  height={300}
                  alt={list.name}
                  className="object-cover object-bottom w-full rounded-none pointer-events-none aspect-square"
                  src={"/assets/no-image.png"}
                  priority
                />

                <div className="absolute min-h-[30px] bottom-0 z-10 p-3 h-auto subpixel-antialiased rounded-b-xl border-b-1  border-white/20 bg-content1/50 backdrop-blur backdrop-saturate-100 overflow-hidden py-1 shadow-small w-full">
                  {list.name}
                </div>
              </Link>
            ))}
        </div>
      </SectionContainer>
    </>
  );
};

export default ListItems;
