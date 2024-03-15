import {ListHomeListsResponse} from "@/services/actions/list.actions";
import SectionContainer from "../common/SectionContainer";
import {ListItemCard} from "../cards/ListItemCard";

const titleColors = [
  "text-rowColor-red",
  "text-rowColor-orange",
  "text-rowColor-light-orange",
  "text-rowColor-yellow",
  "text-rowColor-lime",
];

const TopicLists = ({homeLists}: {homeLists: ListHomeListsResponse}) => {
  const listsWrapperClass =
    "flex gap-3 md:flex-wrap overflow-x-auto md:overflow-x-hidden pb-2 hide-scrollbar rounded-medium";

  return (
    <>
      <SectionContainer className="pt-7 md:pt-11">
        <div className="flex flex-col gap-6">
          {homeLists.map((topic, topicIndex) => {
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
      </SectionContainer>
    </>
  );
};

export default TopicLists;
