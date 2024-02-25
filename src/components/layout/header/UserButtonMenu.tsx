"use clerk";

import {useClerk, useUser} from "@clerk/nextjs";
import {Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react";
import {ListStart, LogOut, User as UserIcon} from "lucide-react";
import Link from "next/link";
import React from "react";

const UserButtonAndMenu = () => {
  const {isLoaded, user} = useUser();

  const {openUserProfile, signOut} = useClerk();

  if (!isLoaded) return null;
  if (!user?.id) return null;

  const itemIconProps = {
    strokeWidth: 1.5,
    size: 20,
  };

  return (
    <>
      <Dropdown
        placement="bottom-end"
        classNames={{
          base: "w-[300px]",
        }}
      >
        <DropdownTrigger>
          <Avatar
            src={user.imageUrl}
            isBordered
            classNames={{
              base: "ring-offset-content1",
            }}
            as={"button"}
            aria-label="Open Profile Menu"
          />
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Profile Menu"
          variant="flat"
          itemClasses={{
            base: "h-10",
          }}
        >
          <DropdownItem key="info" className="h-16" isReadOnly textValue="Profile Info">
            <div className="flex gap-3 h-12 items-center pl-1">
              <Avatar
                src={user.imageUrl}
                isBordered
                classNames={{
                  base: "ring-offset-content1",
                }}
                className="flex-shrink-0"
              />
              <div>
                <div className="font-bold">@{user.username}</div>
                <div className="text-default-500">{user.primaryEmailAddress?.emailAddress}</div>
              </div>
            </div>
          </DropdownItem>
          <DropdownItem
            key="account"
            startContent={<UserIcon {...itemIconProps} />}
            onPress={() => openUserProfile()}
          >
            Account Settings
          </DropdownItem>
          <DropdownItem
            key="mylist"
            startContent={<ListStart {...itemIconProps} />}
            as={Link}
            href={`/user/${user.username}`}
          >
            My Lists
          </DropdownItem>
          <DropdownItem
            key="logout"
            color="danger"
            startContent={<LogOut {...itemIconProps} />}
            onPress={() => signOut()}
          >
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
};

export default UserButtonAndMenu;
