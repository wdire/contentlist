import {MediaType as AnilistMediaType} from "@/services/anilistApi/anilist.generated";
import {TmdbMediaType} from "@/api/lib/schemas/tmdb.schema";
import {SearchSource} from "./search.type";

export type Id = string | number;

export type Row = {
  id: Id;
  title: string;
  color: PrismaJson.RowsType["color"];
};

export type Content = {
  id: Id;
  rowId: Id;
  data: {
    source: "TMDB";
    tmdb?: {
      id: number;
      media_type: TmdbMediaType;
    };
    name: string;
    image_url: string;
  };
};

export type ContentMediaType = "movie" | "tv" | "person" | "anime" | "manga";

export type ContentInfoType = {
  name: string;
  image_url: string;
  source: SearchSource;
  media: ContentMediaType;
  tmdb?: {
    id: number;
    media_type: TmdbMediaType;
  };
  anilist?: {
    id: number;
    type: AnilistMediaType;
  };
};
