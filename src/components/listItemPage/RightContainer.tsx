"use client";

import {Accordion, AccordionItem, Skeleton} from "@nextui-org/react";
import {useAppSelector} from "@/store";
import listSelectors from "@/store/features/list/listSelectors";
import SearchContainer from "./search/SearchContainer";
import ListSaveButton from "./rightItems/ListSaveButton";
import ListActions from "./rightItems/ListActions";

const RightContainer = () => {
  const fetchLoading = useAppSelector(listSelectors.selectFetchLoading);
  const listName = useAppSelector((state) => state.list.info.name);

  return (
    <Skeleton isLoaded={!fetchLoading} className="w-full lg:w-[250px] rounded-medium">
      <div className="w-full h-max relative">
        {listName && (
          <div className="text-2xl mb-5 px-4 py-4 bg-content1 rounded-medium">
            <b className="break-words">{listName}</b> List
          </div>
        )}
        <Accordion defaultSelectedKeys={["search"]} variant="shadow">
          <AccordionItem key={"search"} title="Seach">
            <SearchContainer />
          </AccordionItem>
          <AccordionItem key={"list"} title="List">
            <ListActions />
          </AccordionItem>
        </Accordion>

        <ListSaveButton />
      </div>
    </Skeleton>
  );
};

export default RightContainer;
