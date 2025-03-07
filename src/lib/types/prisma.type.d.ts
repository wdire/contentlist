import {TmdbMediaType} from "@/api/lib/schemas/tmdb.schema";
import {AnilistMediaType} from "@/services/anilistApi/anilist.type";
import {ContentSourceType} from "./list.type";

declare global {
  namespace PrismaJson {
    type ListData = {
      rows: RowsType[];
      storage: ContentType[];
    };

    type RowsType = {
      name: string;
      row_id: string;
      color:
        | "red"
        | "orange"
        | "light-orange"
        | "yellow"
        | "lime-green"
        | "green"
        | "turquoise"
        | "light-blue"
        | "blue"
        | "magenta"
        | "purple"
        | "black"
        | "gray"
        | "silver"
        | "white";
      contents: ContentType[];
    };

    type ContentType = {
      name: string;
      image_url: string;
      source: ContentSourceType;
      notPoster?: boolean;
      square?: boolean;
      tmdb?: TmdbDetailsType | null;
      anilist?: AnilistDetailsType | null;
      igdb?: IgdbDetailsType | null;
      wikipedia?: WikipediaDetailsType | null;
      clearbit?: ClearbitDetailsType | null;
      text?: TextDetailsType | null;
    };

    type TmdbDetailsType = {
      id: number;
      media_type: TmdbMediaType;
    };

    type AnilistDetailsType = {
      id: number;
      type: AnilistMediaType;
    };

    type IgdbDetailsType = {
      id: number;
      slug?: string;
    };

    type WikipediaDetailsType = {
      id: number;
    };

    type ClearbitDetailsType = {
      id: string;
    };

    type TextDetailsType = {
      id: string;
    };
  }
}

export {PrismaJson};
