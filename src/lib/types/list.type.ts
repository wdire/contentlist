import {MediaType as AnilistMediaType} from "@/services/anilistApi/anilist.generated";
import {TmdbMediaType} from "@/api/lib/schemas/tmdb.schema";

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
    source: ContentSourceType;
    tmdb?: {
      id: number;
      media_type: TmdbMediaType;
    };
    name: string;
    image_url: string;
  };
};

export const ContentSourceType = ["tmdb", "anilist"] as const;

export type ContentSourceType = (typeof ContentSourceType)[number];

export type ContentInfoType = PrismaJson.ContentType;
