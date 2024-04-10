import Link from "next/link";
import {LEGAL_LINKS} from "@/lib/constants";
import SectionContainer from "../common/SectionContainer";
import MobileOpenConsole from "../helper/MobileOpenConsole";

const Footer = () => {
  const linkClass = "underline transition-opacity hover:opacity-80";
  const policyClass = "text-gray-400 transition-opacity hover:opacity-80";

  return (
    <div className="bg-content1 py-3 relative">
      <MobileOpenConsole />
      <SectionContainer className="h-full">
        <div className="flex items-center justify-between w-full h-full text-sm gap-3 flex-wrap mb-2">
          <div className="text-sm">
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
            {", "}
            <a className={linkClass} href="https://www.wikipedia.org" target="_blank">
              Wikipedia
            </a>
            {" and "}
            <a className={linkClass} href="https://clearbit.com" target="_blank">
              Clearbit.
            </a>
            <a className={`${linkClass} pl-2`} href="/content-sources">
              See more details.
            </a>
          </div>
          <div>
            Contact <br />
            <a href="mailto:contentlist.rank@gmail.com" className={linkClass}>
              contentlist.rank@gmail.com
            </a>
          </div>
        </div>
        <div className="flex items-center justify-between w-full h-full text-sm gap-3 flex-wrap">
          <div className="flex gap-3 flex-wrap">
            <Link className={policyClass} href={LEGAL_LINKS.terms_of_service}>
              Terms of Service
            </Link>
            <Link className={policyClass} target="_blank" href={LEGAL_LINKS.privacy_policy}>
              Privacy Policy
            </Link>
            <Link className={policyClass} target="_blank" href={LEGAL_LINKS.cookie_policy}>
              Cookie Policy
            </Link>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
};

export default Footer;
