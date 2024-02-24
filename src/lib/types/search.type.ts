import {ApiRequestTypes} from "@/api/lib/schemas/index.schema";
import {TmdbMediaType} from "@/api/lib/schemas/tmdb.schema";
import {
  GetMediaListQuery,
  GetMediaListQueryVariables,
} from "@/services/anilistApi/anilist.generated";

export type SearchSource = "tmdb" | "anilist_anime" | "anilist_manga" | "igdb";

export type SearchSelectionType = {
  id: number;
  name: string;
  image_url: string;
  media_type: TmdbMediaType;
};

export type SearchParams =
  | ApiRequestTypes["/tmdb/search/multi"]["params"]
  | GetMediaListQueryVariables;

export type SearchResponses = ApiRequestTypes["/tmdb/search/multi"]["response"] | GetMediaListQuery;
