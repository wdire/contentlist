"use client";

import {useUser} from "@clerk/nextjs";
import {Button} from "@nextui-org/react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import UserButtonAndMenu from "./UserButtonMenu";
import CreateListButton from "./CreateListButton";

const HeaderRight = () => {
  const {isLoaded, user} = useUser();
  const router = useRouter();

  if (!isLoaded) {
    return null;
  }

  if (isLoaded && !user?.id) {
    return (
      <>
        <Button variant="flat" color="secondary" as={Link} href="/local-lists">
          Local Lists
        </Button>
        <Button
          variant="flat"
          as={Link}
          href={`/auth/sign-in`}
          onClick={(e) => {
            e.preventDefault();
            const redirect_url = window.location.pathname.startsWith("/auth/")
              ? "/"
              : window.location.pathname;
            router.push(`/auth/sign-in?redirect_url=${redirect_url}`);
          }}
        >
          Sign In
        </Button>
      </>
    );
  }

  return (
    <>
      <div className="pr-3 flex gap-3 items-center">
        <CreateListButton />

        <Button
          color="primary"
          variant="flat"
          className="hidden sm:flex"
          as={Link}
          href={`/user/${user.username}`}
        >
          My Lists
        </Button>
      </div>
      <UserButtonAndMenu />
    </>
  );
};

export default HeaderRight;
