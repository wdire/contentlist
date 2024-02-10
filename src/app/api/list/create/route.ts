import {withValidation} from "@/api/lib/withValidation.api";
import prisma from "@/lib/prisma";
import {ApiRequestTypes, ApiSchemas} from "@/api/lib/schemas/index.schema";
import {CreateResponse} from "@/api/lib/response.api";

export const POST = (_request: Request) =>
  withValidation<ApiRequestTypes["/list/update"]["body"], never>(
    {_request, bodySchema: ApiSchemas["/list/create"].body},
    async ({body}) => {
      const response = await prisma.list.create({
        data: {
          name: body.name,
          contentsData: {
            rows: body.rows,
            storage: body.storage,
          },
        },
      });

      return CreateResponse<ApiRequestTypes["/list/create"]["response"]["data"]>({
        status: 200,
        data: response,
      });
    },
  );
