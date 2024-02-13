import {CreateResponse} from "@/api/lib/response.api";
import {ApiRequestTypes, ApiSchemas} from "@/api/lib/schemas/index.schema";
import {RequestParams, withValidation} from "@/api/lib/withValidation.api";
import prisma from "@/lib/prisma";
import {revalidatePath} from "next/cache";

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
    async ({body, params}) => {
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

      revalidatePath("/");

      return CreateResponse<ApiRequestTypes["/list/update"]["response"]["data"]>({
        status: 200,
        data: response,
      });
    },
  );
