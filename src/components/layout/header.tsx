import Image from "next/image";
import Link from "next/link";
import SectionContainer from "../common/SectionContainer";

const Header = () => {
  return (
    <header className="fixed w-full h-header-height bg-content1 z-[100]">
      <SectionContainer className="relative flex justify-between h-full py-4">
        <Link href={"/"}>
          <Image
            src={"/assets/white-horizontal-logo.svg"}
            width={172}
            height={32}
            alt="Content List Logo"
            className="max-h-full pointer-events-none select-none "
          />
        </Link>
      </SectionContainer>
    </header>
  );
};

export default Header;
