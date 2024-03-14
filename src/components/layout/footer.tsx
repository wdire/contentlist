import Link from "next/link";
import SectionContainer from "../common/SectionContainer";

const Footer = () => {
  const linkClass = "underline transition-opacity hover:opacity-80";
  const policyClass = "text-gray-400 transition-opacity hover:opacity-80";

  return (
    <div className="bg-content1 py-3">
      <SectionContainer className="h-full ">
        <div className="text-sm mb-3">
          Using contents from{" "}
          <a className={linkClass} href="https://www.themoviedb.org" target="_blank">
            TMDB
          </a>
          {", "}
          <a className={linkClass} href="https://anilist.co" target="_blank">
            AniList
          </a>
          {", "}
          <a className={linkClass} href="https://www.igdb.com" target="_blank">
            IGDB
          </a>
          {" and "}
          <a className={linkClass} href="https://www.wikipedia.org" target="_blank">
            Wikipedia.
          </a>{" "}
          <a className={`${linkClass} pl-1`} href="/content-sources">
            See more details.
          </a>
        </div>
        <div className="flex items-center w-full h-full text-sm gap-3">
          <Link className={policyClass} href="#">
            Terms of Service
          </Link>
          <Link className={policyClass} href="#">
            Privacy Policy
          </Link>
        </div>
      </SectionContainer>
    </div>
  );
};

export default Footer;
