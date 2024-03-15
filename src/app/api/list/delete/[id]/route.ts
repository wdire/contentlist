import isListOwner from "@/api/lib/middlewares/isListOwner.api";
import {CreateResponse} from "@/api/lib/response.api";
import {withMiddlewares} from "@/api/lib/runMiddlewares.api";
import {ApiRequestTypes, ApiSchemas} from "@/api/lib/schemas/index.schema";
import {deleteImage} from "@/api/lib/utils/cloudinary.util.api";
import {RequestParams, withValidation} from "@/api/lib/withValidation.api";
import {CLOUDINARY_LIST_THUMBS_FOLDER_NAME, CLOUDINARY_PUBLIC_ID_SUFFIX} from "@/lib/constants";
import prisma from "@/lib/prisma";

export const DELETE = (_request: Request, _params: RequestParams) =>
  withValidation<never, ApiRequestTypes["/list/delete"]["params"]>(
    {
      _params,
      paramsSchema: ApiSchemas["/list/delete"].params,
    },
    async ({params}) =>
      withMiddlewares({
        middlewares: [isListOwner(params.id)],
        handler: async () => {
          const response = await prisma.list.delete({
            where: {
              id: params.id,
            },
          });

          const deleteImageRes = await deleteImage(
            `${CLOUDINARY_LIST_THUMBS_FOLDER_NAME}/${CLOUDINARY_PUBLIC_ID_SUFFIX}${params.id}`,
          );
          console.log("deleteImageRes", deleteImageRes);

          return CreateResponse({
            status: 204,
            data: response,
          });
        },
      }),
  );
