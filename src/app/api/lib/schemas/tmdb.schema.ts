import {z} from "zod";
import {ResponseBodyType} from "../response.api";
import {ArrayElement, ZodTypeOf} from "../index.type.api";
import {paths} from "./openapi/tmdb.schema";

export const TmdbSchemas = {
  "/tmdb/search/multi": {
    params: z.object({
      query: z.string(),
    }),
  },
};

export type TmdbRequestTypes = {
  "/tmdb/search/multi": {
    params: ZodTypeOf<(typeof TmdbSchemas)["/tmdb/search/multi"]["params"]>;
    response: ResponseBodyType<
      Omit<
        paths["/3/search/multi"]["get"]["responses"]["200"]["content"]["application/json"],
        "results"
      > & {
        results: TmdbMultiSearchResult[];
      }
    >;
    types: {
      TmdbMultiSearchResult: TmdbMultiSearchResult;
    };
  };
};

export type TmdbMultiSearchResult = PersonResult | TVResult | MovieResult;

type PersonResult = Required<
  ArrayElement<
    NonNullable<
      paths["/3/search/person"]["get"]["responses"]["200"]["content"]["application/json"]["results"]
    >
  > & {media_type: "person"}
>;

type TVResult = Required<
  ArrayElement<
    NonNullable<
      paths["/3/search/tv"]["get"]["responses"]["200"]["content"]["application/json"]["results"]
    >
  > & {media_type: "tv"}
>;

type MovieResult = Required<
  ArrayElement<
    NonNullable<
      paths["/3/search/movie"]["get"]["responses"]["200"]["content"]["application/json"]["results"]
    >
  > & {media_type: "movie"}
>;
