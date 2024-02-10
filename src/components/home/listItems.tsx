"use client";

import {useGetAllQuery} from "@/services/listApi";
import Link from "next/link";
import SectionContainer from "../common/SectionContainer";

const ListItems = () => {
  const {data, isFetching} = useGetAllQuery();

  console.log("data", data);

  return (
    <>
      <SectionContainer>
        <div className="pt-20 flex gap-5">
          {!isFetching &&
            data?.data?.map((list, index) => (
              <Link
                key={index}
                href={`/list/${list.id}`}
                className="shadow-lg shadow-foreground-200 rounded-lg w-52 h-44 flex justify-center items-center text-lg cursor-pointer bg-foreground-50 hover:bg-foreground-100 active:bg-foreground-200 transition-colors "
              >
                {list.name}
              </Link>
            ))}
        </div>
      </SectionContainer>
    </>
  );
};

export default ListItems;
