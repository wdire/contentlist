"use client";

import {Accordion, AccordionItem} from "@nextui-org/react";
import {useAppSelector} from "@/store";
import listSelectors from "@/store/features/list/listSelectors";
import clsx from "clsx";
import Link from "next/link";
import {useUser} from "@clerk/nextjs";
import useIsMobile from "@/lib/hooks/useIsMobile";
import SearchContainer from "./search/SearchContainer";
import ListImages from "./rightItems/ListImages";
import ListActions from "./rightItems/ListActions";
import ListSaveButton from "./rightItems/ListSaveButton";
import ListSkeletons from "../list.skeletons";

const RightContainer = () => {
  const fetchLoading = useAppSelector(listSelectors.selectFetchLoading);
  const listName = useAppSelector((state) => state.list.info.name);
  const isListOwner = useAppSelector((state) => state.list.info.isListOwner);
  const isLocalMode = useAppSelector((state) => state.list.isLocalMode);
  const listOwnerUsername = useAppSelector((state) => state.list.info.owner?.username);

  const isMobile = useIsMobile();

  const {user} = useUser();

  return fetchLoading ? (
    <ListSkeletons.RightContainer />
  ) : (
    <div className="w-full lg:w-[260px] rounded-medium px-3 lg:px-0">
      <div className="w-full h-max relative">
        {!fetchLoading ? (
          <div className="mb-5 px-4 py-4 bg-content1 rounded-medium">
            <div className="text-2xl">
              <b className="break-words">{listName}</b>
            </div>
            <div className="mt-2 flex gap-x-1.5 gap-y-1 leading-5 flex-wrap">
              <span className="text-default-500 flex-shrink-0">
                {isLocalMode ? "Local mode" : "List by"}
              </span>
              {isLocalMode ? null : (
                <Link
                  href={`/user/${listOwnerUsername}`}
                  className="text-rowColor-blue break-words max-w-full transition-opacity hover:opacity-85"
                >
                  {listOwnerUsername}
                </Link>
              )}
            </div>
          </div>
        ) : null}

        <div
          className={clsx({
            hidden: fetchLoading,
          })}
        >
          <Accordion
            defaultSelectedKeys={isMobile ? [] : ["search"]}
            variant="shadow"
            itemClasses={{
              trigger: "px-2 rounded-medium",
              content: "px-2",
            }}
            className="px-2 list-accordion"
            dividerProps={{
              className: "px-4",
            }}
          >
            <AccordionItem key={"search"} title="Seach">
              <SearchContainer />
            </AccordionItem>
            <AccordionItem key={"list"} title="List Options">
              <ListActions />
            </AccordionItem>
            <AccordionItem key={"images"} title="List Images">
              <ListImages />
            </AccordionItem>
          </Accordion>
        </div>

        <div className="mt-5">{!fetchLoading && isListOwner ? <ListSaveButton /> : null}</div>
        {!fetchLoading && user === null && listName && !isLocalMode ? (
          <>
            <div className="mt-5 text-gray-400">Sign in to save changes online</div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default RightContainer;
