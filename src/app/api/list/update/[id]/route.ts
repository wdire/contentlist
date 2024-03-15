import isListOwner from "@/api/lib/middlewares/isListOwner.api";
import {CreateResponse} from "@/api/lib/response.api";
import {withMiddlewares} from "@/api/lib/runMiddlewares.api";
import {ApiRequestTypes, ApiSchemas} from "@/api/lib/schemas/index.schema";
import {deleteImage, uploadImage} from "@/api/lib/utils/cloudinary.util.api";
import {RequestParams, withValidation} from "@/api/lib/withValidation.api";
import prisma from "@/lib/prisma";
import {Prisma} from "@prisma/client";

export const PUT = (_request: Request, _params: RequestParams) =>
  withValidation<
    ApiRequestTypes["/list/update"]["formdata"],
    ApiRequestTypes["/list/update"]["params"]
  >(
    {
      _request,
      formdataSchema: ApiSchemas["/list/update"].formdata,
      _params,
      paramsSchema: ApiSchemas["/list/update"].params,
    },
    async ({body: {body, image, deleteImage: deleteImageValue}, params}) =>
      withMiddlewares({
        middlewares: [isListOwner(params.id)],
        handler: async () => {
          const updatePayload: Prisma.ListUpdateArgs = {
            where: {
              id: params.id,
            },
            data: {
              name: body.name,
              contentsData: {
                rows: body.rows,
                storage: body.storage,
              },
              edited: true,
            },
          };

          if (image === null) {
            if (deleteImageValue) {
              const listImage = await prisma.list.findFirst({
                where: {
                  id: params.id,
                },
                select: {
                  cloudinaryImage: {
                    select: {
                      publicId: true,
                    },
                  },
                },
              });

              if (listImage?.cloudinaryImage?.publicId) {
                await deleteImage(listImage.cloudinaryImage.publicId);
              } else {
                console.error(
                  "Couldn't delete list image. 'deleteImage=true' given but 'list.cloudinaryImage.publicId' doesn't exists",
                );
              }
            }
          } else if (image && image instanceof File) {
            const savedImage = await uploadImage(
              Buffer.from(await (image as File).arrayBuffer()).toString("base64"),
              `list_thumb_${params.id}`,
            );

            if (!savedImage) {
              return CreateResponse({
                status: 500,
                message: "Error occured while uploading image",
              });
            }
            updatePayload.data.cloudinaryImage = {
              connect: {
                id: savedImage.id,
              },
            };
          }

          const response = await prisma.list.update(updatePayload);

          return CreateResponse<ApiRequestTypes["/list/update"]["response"]["data"]>({
            status: 200,
            data: response,
          });
        },
      }),
  );
