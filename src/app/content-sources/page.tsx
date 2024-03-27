import SectionContainer from "@/components/common/SectionContainer";
import Image from "next/image";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "Content Sources",
};

const ContentSources = () => {
  const SourceTitle = ({count, link, name}: {count: string; name: string; link: string}) => {
    return (
      <h3 className="text-2xl font-medium">
        {`${count}. `}
        <a href={link} className="underline transition-opacity hover:opacity-80" target="_blank">
          {name}
        </a>
      </h3>
    );
  };

  return (
    <SectionContainer className="py-page-top-space mb-10">
      <h2 className="mb-3 text-3xl">Content Sources</h2>

      <p>
        ContentList uses third-party APIs to allow users to easily search for and add contents to
        list for ranking.
      </p>
      <p className="mb-10 mt-2">Content consists of a name and image.</p>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <SourceTitle count="1" name="TMDB" link="https://www.themoviedb.org" />

          <p>Using TMDB API for adding Movie, Tv and People contents to lists.</p>
          <Image src={"/assets/sources/tmdb-logo.svg"} width={100} height={100} alt="TMDB Logo" />
          <p className="italic max-w-[420px]">
            ContentList uses TMDB and the TMDB APIs but is not endorsed, certified, or otherwise
            approved by TMDB.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <SourceTitle count="2" name="AniList" link="https://anilist.co" />
          <p>Using AniList API for adding Anime, Manga and Character contents to lists.</p>
        </div>
        <div className="flex flex-col gap-3">
          <SourceTitle count="3" name="IGDB" link="https://www.igdb.com" />
          <p>Using IGDB API for adding Game contents to lists.</p>
        </div>
        <div className="flex flex-col gap-3">
          <SourceTitle count="3" name="Wikipedia" link="https://www.wikipedia.org" />
          <p>
            Using Wikipedia API for adding general contents to lists. Using name and thumbnail of
            Wikipedia Article as content for ranking.
          </p>
        </div>
      </div>
    </SectionContainer>
  );
};

export default ContentSources;
