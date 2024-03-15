import tmdbAxios from "@/api/lib/axios/tmdb.axios";
import {CreateResponse} from "@/api/lib/response.api";
import {ApiRequestTypes, ApiSchemas} from "@/api/lib/schemas/index.schema";
import {withValidation} from "@/api/lib/withValidation.api";
import {AxiosResponse} from "axios";

export const GET = (_request: Request) =>
  withValidation<never, ApiRequestTypes["/tmdb/search/multi"]["params"]>(
    {
      paramsUrl: _request.url,
      paramsSchema: ApiSchemas["/tmdb/search/multi"].params,
    },
    async ({params}) => {
      const response: AxiosResponse<ApiRequestTypes["/tmdb/search/multi"]["response"]["data"]> =
        await tmdbAxios({
          url: "/search/multi",
          params: {
            query: params.query,
          },
          method: "GET",
        });

      return CreateResponse<ApiRequestTypes["/tmdb/search/multi"]["response"]["data"]>({
        status: 200,
        data: response.data,
      });
    },
  );
