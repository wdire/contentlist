"use client";

import {useGetQuery} from "@/services/userApi";
import React from "react";
import Image from "next/image";
import {useGetAllByUserIdQuery} from "@/services/listApi";
import {Skeleton} from "@nextui-org/react";
import SectionContainer from "../common/SectionContainer";
import {ListItemCard} from "../cards/ListItemCard";

const UserPage = ({username}: {username: string}) => {
  const {
    data: userData,
    isFetching: userFetching,
    isLoading: userLoading,
  } = useGetQuery({
    username,
  });

  const {data: userLists, isLoading: userListsLoading} = useGetAllByUserIdQuery(
    {
      userId: userData?.data?.id || "",
    },
    {
      skip: !userData?.data?.id,
    },
  );

  if (!userFetching && !userData?.data?.id) {
    // redirect
    return null;
  }

  if (userLoading || userListsLoading) {
    return (
      <SectionContainer className="pt-page-top-space">
        <div className="flex flex-col gap-6">
          <div className="flex gap-3 h-[84px]">
            <Skeleton className="font-medium text-2xl sm:text-3xl bg-content1 w-max px-5 rounded-medium flex items-center">
              Lists of
            </Skeleton>
            <Skeleton className="flex-shrink-0 w-40 rounded-medium" />
          </div>

          <div className="flex gap-2">
            <div className="flex gap-5 flex-wrap">
              {[1, 2, 3, 4, 5, 6].map((s) => (
                <ListItemCard list={{id: 0, name: ""}} key={s} isLoading />
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>
    );
  }

  if (!userData?.data?.id) {
    return <>Couldn&apos;t get user data</>;
  }

  const user = userData.data;

  return (
    <SectionContainer className="pt-page-top-space">
      <div className="flex flex-col gap-6">
        <div className="flex gap-3">
          <div className="font-medium text-2xl sm:text-3xl bg-content1 w-max px-5 rounded-medium flex items-center">
            Lists of
          </div>
          <div className="flex-shrink-0 flex-1 sm:flex-none sm:w-max sm:max-w-72 bg-content1 gap-4 py-3 px-4 rounded-medium flex items-center">
            <Image
              src={user.imageUrl || "/assets/no-image.png"}
              width={60}
              height={60}
              alt={`${user.username} profile image`}
              className="rounded-full"
            />
            <div className="font-medium max-w-full break-words min-w-1">@{user.username}</div>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="flex gap-5 flex-wrap">
            {userLists?.data?.map((list, index) => <ListItemCard list={list} key={index} />)}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default UserPage;
