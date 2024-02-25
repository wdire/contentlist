"use client";

import {Accordion, AccordionItem, Skeleton} from "@nextui-org/react";
import {useAppSelector} from "@/store";
import listSelectors from "@/store/features/list/listSelectors";
import dynamic from "next/dynamic";
import clsx from "clsx";
import Link from "next/link";
import SearchContainer from "./search/SearchContainer";

const ListActions = dynamic(() => import("./rightItems/ListActions"));
const ListSaveButton = dynamic(() => import("./rightItems/ListSaveButton"));

const RightContainer = () => {
  const fetchLoading = useAppSelector(listSelectors.selectFetchLoading);
  const listName = useAppSelector((state) => state.list.info.name);
  const isListOwner = useAppSelector((state) => state.list.info.isListOwner);
  const listOwnerUsername = useAppSelector((state) => state.list.info.owner?.username);

  return (
    <div className="w-full lg:w-[260px] rounded-medium">
      <div className="w-full h-max relative">
        {!fetchLoading ? (
          <div className="mb-5 px-4 py-4 bg-content1 rounded-medium">
            <div className="text-2xl">
              <b className="break-words">{listName}</b>
            </div>
            <div className="mt-2 flex gap-x-2 gap-y-1 leading-5 flex-wrap">
              <span className="text-default-500 flex-shrink-0">List by</span>{" "}
              <Link
                href={`/user/${listOwnerUsername}`}
                className="text-rowColor-blue break-words max-w-full transition-opacity hover:opacity-85"
              >
                {listOwnerUsername}
              </Link>
            </div>
          </div>
        ) : (
          <Skeleton isLoaded={!fetchLoading} className="w-full mb-5 h-[88px] rounded-medium" />
        )}

        <div
          className={clsx({
            hidden: fetchLoading,
          })}
        >
          <Accordion defaultSelectedKeys={["search"]} variant="shadow">
            <AccordionItem key={"search"} title="Seach">
              <SearchContainer />
            </AccordionItem>
            <AccordionItem key={"list"} title="List">
              <ListActions />
            </AccordionItem>
          </Accordion>
        </div>

        {fetchLoading ? <Skeleton className="w-full h-[197px] rounded-medium" /> : null}

        {isListOwner ? <ListSaveButton /> : null}
      </div>
    </div>
  );
};

export default RightContainer;
