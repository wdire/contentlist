import {CreateResponse} from "@/api/lib/response.api";
import {ApiRequestTypes, ApiSchemas} from "@/api/lib/schemas/index.schema";
import {RequestParams, withValidation} from "@/api/lib/withValidation.api";
import prisma from "@/lib/prisma";

export const DELETE = (_request: Request, _params: RequestParams) =>
  withValidation<never, ApiRequestTypes["/list/delete"]["params"]>(
    {
      _params,
      paramsSchema: ApiSchemas["/list/delete"].params,
    },
    async ({params}) => {
      const response = await prisma.list.delete({
        where: {
          id: params.id,
        },
      });

      return CreateResponse({
        status: 204,
        data: response,
      });
    },
  );
