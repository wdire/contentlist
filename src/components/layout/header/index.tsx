import Image from "next/image";
import Link from "next/link";
import {SignInButton, SignedIn, SignedOut, UserButton} from "@clerk/nextjs";
import SectionContainer from "@/components/common/SectionContainer";
import CreateListButton from "./CreateListButton";

const Header = () => {
  return (
    <header className="fixed w-full h-header-height bg-content1 z-[100]">
      <SectionContainer className="relative flex justify-between h-full py-4">
        <Link href={"/"} className="cursor-pointer flex flex-shrink-0 items-center">
          <Image
            src={"/assets/white-horizontal-logo.svg"}
            width={175}
            height={32}
            alt="Content List Logo"
            className="max-h-full h-6 md:h-auto w-max pointer-events-none select-none"
            priority
          />
        </Link>
        <SignedIn>
          <div className="flex gap-2 md:gap-4 items-center">
            <CreateListButton />
            <UserButton />
          </div>
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </SectionContainer>
    </header>
  );
};

export default Header;
