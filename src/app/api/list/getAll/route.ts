import {CreateResponse} from "@/api/lib/response.api";
import {ApiRequestTypes} from "@/api/lib/schemas/index.schema";
import {withValidation} from "@/api/lib/withValidation.api";

import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const GET = (_request: Request) =>
  withValidation<never, never>({_request}, async () => {
    const response = await prisma.list.findMany({
      select: {
        id: true,
        name: true,
        imageUrl: true,
      },
    });

    return CreateResponse<ApiRequestTypes["/list/getAll"]["response"]["data"]>({
      status: 200,
      data: response,
    });
  });
