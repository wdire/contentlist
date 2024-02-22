"use client";

import {useGetAllQuery} from "@/services/listApi";
import SectionContainer from "../common/SectionContainer";
import {ListItemCard} from "../cards/ListItemCard";

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
