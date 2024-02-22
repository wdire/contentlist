"use client";

import {useUser} from "@clerk/nextjs";
import {Button} from "@nextui-org/react";
import Link from "next/link";
import useIsMobile from "@/lib/hooks/useIsMobile";
import UserButtonAndMenu from "./UserButtonMenu";
import CreateListButton from "./CreateListButton";

const HeaderRight = () => {
  const {isLoaded, user} = useUser();

  if (!isLoaded) {
    return null;
  }

  if (isLoaded && !user?.id) {
    return (
      <>
        <Button variant="light" as={Link} href="/auth/sign-in">
          Sign In
        </Button>
      </>
    );
  }

  return (
    <>
      <div className="pr-3 flex gap-3 items-center">
        <CreateListButton />

        <Button color="primary" variant="flat" className="hidden sm:flex">
          My Lists
        </Button>
      </div>
      <UserButtonAndMenu />
    </>
  );
};

export default HeaderRight;
