import {CreateResponse} from "@/api/lib/response.api";
import {ApiRequestTypes, ApiSchemas} from "@/api/lib/schemas/index.schema";
import {RequestParams, withValidation} from "@/api/lib/withValidation.api";
import prisma from "@/lib/prisma";
import {Prisma} from "@prisma/client";

export const dynamic = "force-dynamic";

export const GET = (_request: Request, _params: RequestParams) =>
  withValidation<never, ApiRequestTypes["/list/getAllByUserId"]["params"]>(
    {
      _params,
      paramsSchema: ApiSchemas["/list/getAllByUserId"].params,
    },
    async ({params}) => {
      try {
        const response = await prisma.list.findMany({
          where: {
            userId: params.userId,
          },
          select: {
            id: true,
            name: true,
            imageUrl: true,
          },
        });

        if (!response) {
          return CreateResponse({status: 200, data: null});
        }

        return CreateResponse<ApiRequestTypes["/list/getAllByUserId"]["response"]["data"]>({
          status: 200,
          data: response,
        });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          return CreateResponse({status: 406, error});
        }
        return CreateResponse({status: 500, error});
      }
    },
  );
