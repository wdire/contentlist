import {ListRequestTypes, ListSchemas} from "./list.schema";
import {TmdbRequestTypes, TmdbSchemas} from "./tmdb.schema";
import {UserRequestTypes, UserSchemas} from "./user.schema";

export type ApiRequestTypes = ListRequestTypes & TmdbRequestTypes & UserRequestTypes;

export const ApiSchemas = {
  ...ListSchemas,
  ...TmdbSchemas,
  ...UserSchemas,
};
