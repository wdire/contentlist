"use client";

import {Accordion, AccordionItem, Skeleton} from "@nextui-org/react";
import {useAppSelector} from "@/store";
import listSelectors from "@/store/features/list/listSelectors";
import dynamic from "next/dynamic";
import SearchContainer from "./search/SearchContainer";
import ListActions from "./rightItems/ListActions";

const ListSaveButton = dynamic(() => import("./rightItems/ListSaveButton"));

const RightContainer = () => {
  const fetchLoading = useAppSelector(listSelectors.selectFetchLoading);
  const listName = useAppSelector((state) => state.list.info.name);
  const isListOwner = useAppSelector((state) => state.list.isListOwner);

  return (
    <Skeleton isLoaded={!fetchLoading} className="w-full lg:w-[250px] rounded-medium">
      <div className="w-full h-max relative">
        {listName && (
          <div className="mb-5 px-4 py-4 bg-content1 rounded-medium">
            <div className="text-2xl">
              <b className="break-words">{listName}</b>
            </div>
            <div>
              List by <span className="text-primary">WDireX</span>
            </div>
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

        {isListOwner ? <ListSaveButton /> : null}
      </div>
    </Skeleton>
  );
};

export default RightContainer;
