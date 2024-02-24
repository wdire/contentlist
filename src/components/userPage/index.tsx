"use client";

import {useGetQuery} from "@/services/userApi";
import React from "react";
import Image from "next/image";
import {useGetAllByUserIdQuery} from "@/services/listApi";
import {Skeleton} from "@nextui-org/react";
import {useRouter} from "next/navigation";
import SectionContainer from "../common/SectionContainer";
import {ListItemCard} from "../cards/ListItemCard";

const UserPage = ({username}: {username: string}) => {
  const router = useRouter();

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
    router.replace("/404");

    return null;
  }

  if (userLoading || userListsLoading) {
    return (
      <SectionContainer className="pt-page-top-space">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <Skeleton className="h-[84px] font-medium text-3xl bg-content1 w-max px-5 rounded-medium flex items-center">
              Lists of
            </Skeleton>
            <Skeleton className="flex-shrink-0 h-[84px] w-48 rounded-medium" />
          </div>

          <div className="flex gap-2">
            <div className="flex gap-5 flex-wrap">
              {[1, 2, 3, 4].map((s) => (
                <ListItemCard list={{id: 0, name: ""}} key={s} isLoading />
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>
    );
  }

  if (!userData?.data?.id) {
    console.error("Couldn't get user data");
    return null;
  }

  const user = userData.data;

  return (
    <SectionContainer className="pt-page-top-space">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="h-[84px] font-medium text-3xl bg-content1 w-max px-5 rounded-medium flex items-center">
            Lists of
          </div>
          <div className="max-w-full w-max sm:max-w-72 bg-content1 gap-4 py-3 px-4 rounded-medium flex items-center">
            <Image
              src={user.imageUrl || "/assets/no-image.png"}
              width={60}
              height={60}
              alt={`${user.username} profile image`}
              className="rounded-full"
              priority
            />
            <div className="font-medium max-w-full break-words min-w-1 pr-3">@{user.username}</div>
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
