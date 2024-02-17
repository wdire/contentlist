import {withValidation} from "@/api/lib/withValidation.api";
import prisma from "@/lib/prisma";
import {ApiRequestTypes, ApiSchemas} from "@/api/lib/schemas/index.schema";
import {CreateResponse} from "@/api/lib/response.api";
import {currentUser} from "@clerk/nextjs";

export const POST = (_request: Request) =>
  withValidation<ApiRequestTypes["/list/create"]["body"], never>(
    {_request, bodySchema: ApiSchemas["/list/create"].body},
    async ({body}) => {
      const user = await currentUser();

      if (!user) {
        return CreateResponse({status: 401});
      }

      const hasUneditedList = await prisma.list.findFirst({
        where: {
          user: {
            id: user.id,
          },
          edited: false,
        },
      });

      if (hasUneditedList) {
        return CreateResponse<ApiRequestTypes["/list/create"]["response"]["data"]>({
          status: 200,
          message: "User already has an unedited list",
          data: hasUneditedList,
        });
      }

      const response = await prisma.list.create({
        data: {
          name: body.name,
          user: {
            connect: {
              id: user.id,
            },
          },
          contentsData: {
            rows: [],
            storage: [],
          },
        },
      });

      return CreateResponse<ApiRequestTypes["/list/create"]["response"]["data"]>({
        status: 200,
        data: response,
      });
    },
  );
