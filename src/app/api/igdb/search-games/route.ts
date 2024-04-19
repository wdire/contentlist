import igdbAxios from "@/api/lib/axios/igdb.axios";
import {CreateResponse} from "@/api/lib/response.api";
import {ApiRequestTypes, ApiSchemas} from "@/api/lib/schemas/index.schema";
import {withValidation} from "@/api/lib/withValidation.api";
import {AxiosResponse} from "axios";

export const POST = (_request: Request) =>
  withValidation<ApiRequestTypes["/igdb/search-games"]["body"], never>(
    {
      _request,
      bodySchema: ApiSchemas["/igdb/search-games"].body,
    },
    async ({body}) => {
      const response: AxiosResponse<ApiRequestTypes["/igdb/search-games"]["response"]["data"]> =
        await igdbAxios({
          url: "/games",
          method: "POST",
          data: `search "${body.query}"; fields name, slug, cover.image_id; where category = 0;`,
        });

      return CreateResponse<ApiRequestTypes["/igdb/search-games"]["response"]["data"]>({
        status: 200,
        data: response.data,
      });
    },
  );
