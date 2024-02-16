import isListOwner from "@/api/lib/middlewares/isListOwner.api";
import {CreateResponse} from "@/api/lib/response.api";
import {withMiddlewares} from "@/api/lib/runMiddlewares.api";
import {ApiRequestTypes, ApiSchemas} from "@/api/lib/schemas/index.schema";
import {RequestParams, withValidation} from "@/api/lib/withValidation.api";
import prisma from "@/lib/prisma";

export const PUT = (_request: Request, _params: RequestParams) =>
  withValidation<
    ApiRequestTypes["/list/update"]["body"],
    ApiRequestTypes["/list/update"]["params"]
  >(
    {
      _request,
      bodySchema: ApiSchemas["/list/update"].body,
      _params,
      paramsSchema: ApiSchemas["/list/update"].params,
    },
    async ({body, params}) =>
      withMiddlewares({
        middlewares: [isListOwner(params.id)],
        handler: async () => {
          const response = await prisma.list.update({
            where: {
              id: params.id,
            },
            data: {
              name: body.name,
              contentsData: {
                rows: body.rows,
                storage: body.storage,
              },
            },
          });

          return CreateResponse<ApiRequestTypes["/list/update"]["response"]["data"]>({
            status: 200,
            data: response,
          });
        },
      }),
  );
