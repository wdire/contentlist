"use client";

import {Accordion, AccordionItem, Skeleton} from "@nextui-org/react";
import {useAppSelector} from "@/store";
import listSelectors from "@/store/features/list/listSelectors";
import SearchContainer from "./search/SearchContainer";
import ListSaveButton from "./rightItems/ListSaveButton";
import ListActions from "./rightItems/ListActions";

const RightContainer = () => {
  const fetchLoading = useAppSelector(listSelectors.selectFetchLoading);

  return (
    <Skeleton isLoaded={!fetchLoading}>
      <div className="w-[250px] h-full">
        <Accordion defaultSelectedKeys={["search"]}>
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
