import {ListItemCard} from "@/components/cards/ListItemCard";
import SectionContainer from "@/components/common/SectionContainer";
import {ListHomeListsResponse} from "@/services/actions/list.actions";

const titleColors = [
  "text-rowColor-red",
  "text-rowColor-orange",
  "text-rowColor-light-orange",
  "text-rowColor-yellow",
  "text-rowColor-lime-green",
  "text-rowColor-turquoise",
  "text-rowColor-light-blue",
];

const TopicLists = ({homeLists}: {homeLists: ListHomeListsResponse}) => {
  const listsWrapperClass =
    "flex gap-3 md:flex-wrap overflow-x-auto md:overflow-x-hidden pb-3 scrollbar-thin rounded-medium";

  return (
    <>
      <SectionContainer className="pt-7 md:pt-11">
        <div className="flex flex-col gap-10">
          {!homeLists || homeLists.length === 0 ? (
            <div>No content found</div>
          ) : (
            homeLists.map((topic, topicIndex) => {
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
            })
          )}
        </div>
      </SectionContainer>
    </>
  );
};

export default TopicLists;
