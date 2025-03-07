import SectionContainer from "@/components/common/SectionContainer";
import {Skeleton} from "@nextui-org/react";
import {ListItemCard} from "@/components/cards/ListItemCard";
import {HomeDescriptionContent} from "./components/HomeDescriptionContent";

const Loading = () => {
  const listsWrapperClass = "flex gap-3 md:flex-wrap pb-2 hide-scrollbar rounded-medium";

  return (
    <>
      <SectionContainer className="pt-page-top-space">
        <div>
          <div className="flex">
            <Skeleton className="inline-block rounded-lg h-9 sm:h-10 w-[89px] sm:w-[124px] mr-2" />
            <Skeleton className="inline-block rounded-lg h-9 sm:h-10 w-48 sm:w-72" />
          </div>
          <Skeleton className="rounded-lg mt-4">
            <HomeDescriptionContent />
          </Skeleton>
        </div>
      </SectionContainer>
      <SectionContainer className="pt-7 md:pt-11">
        <div className="flex flex-col gap-9 md:gap-12">
          <div>
            <Skeleton className="w-32 rounded-medium h-8 mb-4" />
            <div className={listsWrapperClass}>
              {[1, 2, 3, 4, 5].map((l, i) => (
                <ListItemCard
                  list={{id: 0, name: "", cloudinaryImage: null}}
                  key={i}
                  xScrollParent
                  isLoading
                />
              ))}
            </div>
          </div>
          <div>
            <Skeleton className="w-32 rounded-medium h-8 mb-4" />
            <div className={listsWrapperClass}>
              {[1, 2, 3, 4, 5].map((l, i) => (
                <ListItemCard
                  list={{id: 0, name: "", cloudinaryImage: null}}
                  key={i}
                  xScrollParent
                  isLoading
                />
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>
    </>
  );
};

export default Loading;
