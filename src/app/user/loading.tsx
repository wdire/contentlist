import {ListItemCard} from "@/components/cards/ListItemCard";
import SectionContainer from "@/components/common/SectionContainer";
import {Skeleton} from "@nextui-org/react";
import React from "react";

const Loading = () => {
  return (
    <SectionContainer className="pt-page-top-space">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <Skeleton className="h-[84px] font-medium text-3xl bg-content1 w-max px-5 rounded-medium flex items-center">
            Lists of
          </Skeleton>
          <Skeleton className="flex-shrink-0 h-[84px] w-48 rounded-medium" />
        </div>

        <div className="flex gap-2">
          <div className="flex gap-3 flex-wrap w-full">
            {[1, 2, 3, 4, 5].map((s) => (
              <ListItemCard list={{id: 0, name: "", cloudinaryImage: null}} key={s} isLoading />
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default Loading;
