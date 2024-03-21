import Image from "next/image";
import Link from "next/link";
import SectionContainer from "@/components/common/SectionContainer";
import HeaderRight from "./HeaderRight";

const Header = () => {
  return (
    <header className="fixed w-full h-header-height bg-content1 z-[100]">
      <SectionContainer className="relative flex justify-between h-full py-4">
        <Link href={"/"} className="cursor-pointer flex items-center">
          <Image
            src={"/assets/white-horizontal-logo.svg"}
            width={175}
            height={32}
            alt="ContentList Logo"
            className="max-h-full h-6 w-auto sm:h-[31px] pointer-events-none select-none"
            priority
          />
        </Link>

        <div className="flex gap-2 items-center">
          <HeaderRight />
        </div>
      </SectionContainer>
    </header>
  );
};

export default Header;
