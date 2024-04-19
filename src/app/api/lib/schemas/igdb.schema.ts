import {z} from "zod";
import {ZodTypeOf} from "../index.type.api";
import {ResponseBodyType} from "../response.api";

export const IgdbSchemas = {
  "/igdb/search-games": {
    body: z.object({
      query: z.string(),
    }),
  },
};

export type IgdbRequestTypes = {
  "/igdb/search-games": {
    body: ZodTypeOf<(typeof IgdbSchemas)["/igdb/search-games"]["body"]>;
    response: ResponseBodyType<IgdbGamesSearchResultItem[]>;
    types: {
      IgdbGamesSearchResultItem: IgdbGamesSearchResultItem;
    };
  };
};

type IgdbGamesSearchResultItem = {
  id: number;
  cover: {
    id: number;
    image_id: string;
  };
  name: string;
  slug: string;
};
