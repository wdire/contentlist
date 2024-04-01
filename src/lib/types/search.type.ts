import {TmdbMediaType, TmdbRequestTypes} from "@/api/lib/schemas/tmdb.schema";
import {
  GetMediaListQuery,
  GetMediaListQueryVariables,
} from "@/services/anilistApi/anilist.generated";

export const SearchSource = [
  "tmdb",
  "anilist_anime",
  "anilist_manga",
  "anilist_character",
  "igdb",
  "wikipedia",
  "clearbit",
  "text",
] as const;

export type SearchSource = (typeof SearchSource)[number];

export type SearchSelectionType = {
  id: number;
  name: string;
  image_url: string;
  media_type: TmdbMediaType;
};

export type SearchParams =
  | TmdbRequestTypes["/tmdb/search/multi"]["params"]
  | GetMediaListQueryVariables;

export type SearchResponses =
  | TmdbRequestTypes["/tmdb/search/multi"]["response"]
  | GetMediaListQuery;
