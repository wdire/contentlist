import {withValidation} from "@/api/lib/withValidation.api";
import prisma from "@/lib/prisma";
import {ApiRequestTypes, ApiSchemas} from "@/api/lib/schemas/index.schema";
import {CreateResponse} from "@/api/lib/response.api";
import {currentUser} from "@clerk/nextjs";
import {Prisma} from "@prisma/client";
import {uploadImage} from "@/api/lib/utils/cloudinary.util.api";

export const POST = (_request: Request) =>
  withValidation<ApiRequestTypes["/list/create"]["formdata"], never>(
    {_request, formdataSchema: ApiSchemas["/list/create"].formdata},
    async ({body}) => {
      const user = await currentUser();

      if (!user) {
        return CreateResponse({status: 401, message: "List create, user not found"});
      }

      const listCreateArgs: Prisma.ListCreateArgs = {
        data: {
          name: "",
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
      };

      if ("copyListId" in body) {
        const listToCopy = await prisma.list.findFirst({
          where: {
            id: body.copyListId,
          },
        });

        if (!listToCopy) {
          return CreateResponse({
            status: 404,
            message: "List to copy doesn't exists",
          });
        }

        listCreateArgs.data.copiedFrom = {
          connect: {
            id: body.copyListId,
          },
        };
        listCreateArgs.data.name = `${listToCopy.name} Copy`;
        listCreateArgs.data.contentsData = body.contentsData;
      } else {
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

        listCreateArgs.data.name = body.name;
      }

      const response = await prisma.list.create(listCreateArgs);

      if ("copyListId" in body) {
        if (body.image && body.image instanceof File) {
          const savedImage = await uploadImage({
            base64String: Buffer.from(await (body.image as File).arrayBuffer()).toString("base64"),
            public_id: `list_thumb_${response.id}`,
            listId: response.id,
          });

          if (!savedImage) {
            console.error("Error occured while saving image, list copy.");
          }
        }
      }

      return CreateResponse<ApiRequestTypes["/list/create"]["response"]["data"]>({
        status: 200,
        data: response,
      });
    },
  );
