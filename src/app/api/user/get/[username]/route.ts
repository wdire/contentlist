import {CreateResponse} from "@/api/lib/response.api";
import {ApiRequestTypes, ApiSchemas} from "@/api/lib/schemas/index.schema";
import {RequestParams, withValidation} from "@/api/lib/withValidation.api";
import prisma from "@/lib/prisma";
import {Prisma} from "@prisma/client";

export const dynamic = "force-dynamic";

export const GET = (_request: Request, _params: RequestParams) =>
  withValidation<never, ApiRequestTypes["/user/get"]["params"]>(
    {
      _params,
      paramsSchema: ApiSchemas["/user/get"].params,
    },
    async ({params}) => {
      try {
        const response = await prisma.user.findFirst({
          where: {
            username: params.username,
          },
        });

        if (!response) {
          return CreateResponse({status: 200, data: null});
        }

        return CreateResponse<ApiRequestTypes["/user/get"]["response"]["data"]>({
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
