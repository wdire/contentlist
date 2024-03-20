"use client";

import {Accordion, AccordionItem, Skeleton} from "@nextui-org/react";
import {useAppSelector} from "@/store";
import listSelectors from "@/store/features/list/listSelectors";
import dynamic from "next/dynamic";
import clsx from "clsx";
import Link from "next/link";
import {useUser} from "@clerk/nextjs";
import SearchContainer from "./search/SearchContainer";
import ListCopyButton from "./rightItems/ListCopyButton";
import ListLocalSaveButton from "./rightItems/ListLocalSaveButton";
import ListImages from "./rightItems/ListImages";

const ListActions = dynamic(() => import("./rightItems/ListActions"));
const ListSaveButton = dynamic(() => import("./rightItems/ListSaveButton"));

// TODO: Add "Source details" button to show source(tmdb, igdb, ...) and type(movie, game, ...)

const RightContainer = () => {
  const fetchLoading = useAppSelector(listSelectors.selectFetchLoading);
  const listName = useAppSelector((state) => state.list.info.name);
  const isListOwner = useAppSelector((state) => state.list.info.isListOwner);
  const isLocalMode = useAppSelector((state) => state.list.isLocalMode);
  const listOwnerUsername = useAppSelector((state) => state.list.info.owner?.username);

  const {user} = useUser();

  return (
    <div className="w-full lg:w-[260px] rounded-medium">
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
        ) : (
          <Skeleton isLoaded={!fetchLoading} className="w-full mb-5 h-[92px] rounded-medium" />
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
            <AccordionItem key={"list"} title="List Options">
              <ListActions />
            </AccordionItem>
            <AccordionItem key={"images"} title="List Images">
              <ListImages />
            </AccordionItem>
          </Accordion>
        </div>

        {fetchLoading ? <Skeleton className="w-full h-[257px] rounded-medium" /> : null}

        {fetchLoading ? <Skeleton className="w-20 h-10 mt-5 rounded-medium" /> : null}

        <div className="mt-5">{!fetchLoading && isListOwner ? <ListSaveButton /> : null}</div>
        {!fetchLoading && user === null && listName && !isLocalMode ? (
          <>
            <div className="mt-5 text-gray-400">Sign in to save changes online</div>
          </>
        ) : null}

        {!fetchLoading && !user ? <ListLocalSaveButton /> : null}

        {user && !fetchLoading && !isListOwner && !isLocalMode ? <ListCopyButton /> : null}
      </div>
    </div>
  );
};

export default RightContainer;
