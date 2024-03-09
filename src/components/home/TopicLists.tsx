"use client";

import {useGetHomeListsQuery} from "@/services/listApi";
import {Skeleton} from "@nextui-org/react";
import SectionContainer from "../common/SectionContainer";
import {ListItemCard} from "../cards/ListItemCard";

const titleColors = [
  "text-rowColor-red",
  "text-rowColor-orange",
  "text-rowColor-light-orange",
  "text-rowColor-yellow",
  "text-rowColor-lime",
];

const TopicLists = () => {
  const {data, isFetching} = useGetHomeListsQuery();

  const listsWrapperClass =
    "flex gap-3 md:flex-wrap overflow-x-auto md:overflow-x-hidden pb-2 hide-scrollbard rounded-medium";

  return (
    <>
      <SectionContainer className="pt-7 md:pt-11">
        {isFetching ? (
          <div className="flex flex-col gap-6">
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
        ) : (
          <div className="flex flex-col gap-6">
            {data?.data?.map((topic, topicIndex) => {
              return (
                <div key={topicIndex}>
                  <h2 className={"text-2xl mb-4 font-medium"}>
                    Topic <span className={titleColors[topicIndex]}>{topic.name}</span>
                  </h2>

                  <div className={listsWrapperClass}>
                    {topic.ListInTopic?.map((ListInTopicItem, listIndex) => (
                      <ListItemCard list={ListInTopicItem.list} key={listIndex} xScrollParent />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </SectionContainer>
    </>
  );
};

export default TopicLists;
