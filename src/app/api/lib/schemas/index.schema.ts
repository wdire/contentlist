import {ListRequestTypes, ListSchemas} from "./list.schema";
import {TmdbRequestTypes, TmdbSchemas} from "./tmdb.schema";

export type ApiRequestTypes = ListRequestTypes & TmdbRequestTypes;

export const ApiSchemas = {
  ...ListSchemas,
  ...TmdbSchemas,
};
