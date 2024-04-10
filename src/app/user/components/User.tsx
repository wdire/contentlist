import React from "react";
import Image from "next/image";

import {ListsByUserIdResponse} from "@/services/actions/list.actions";
import {UserByUsernameResponse} from "@/services/actions/user.actions";
import SectionContainer from "@/components/common/SectionContainer";
import {ListItemCard} from "@/components/cards/ListItemCard";

const User = ({
  user,
  userLists,
}: {
  user: UserByUsernameResponse;
  userLists: ListsByUserIdResponse;
}) => {
  return (
    <SectionContainer className="py-page-top-space">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="h-[84px] font-medium text-3xl bg-content1 w-max px-5 rounded-medium flex items-center">
            Lists of
          </div>
          <div className="max-w-full w-max sm:max-w-72 bg-content1 gap-4 py-3 px-4 rounded-medium flex items-center">
            <Image
              src={user?.imageUrl ? `${user?.imageUrl}?width=100` : "/assets/no-image.png"}
              width={60}
              height={60}
              alt={`${user?.username} profile image`}
              className="rounded-full w-[60px] h-[60px] aspect-square"
              priority
              unoptimized={!!user?.imageUrl}
            />
            <div className="font-medium max-w-full break-words min-w-1 pr-3">@{user.username}</div>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="flex gap-3 flex-wrap">
            {userLists.map((list, index) => (
              <ListItemCard list={list} key={index} />
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default User;
