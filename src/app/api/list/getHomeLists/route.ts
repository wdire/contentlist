import {CreateResponse} from "@/api/lib/response.api";
import {ApiRequestTypes} from "@/api/lib/schemas/index.schema";
import {withValidation} from "@/api/lib/withValidation.api";

import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const GET = (_request: Request) =>
  withValidation<never, never>({_request}, async () => {
    const topicIds: number[] = JSON.parse(process.env.HOME_TOPIC_IDS) || [];

    const response = await prisma.topic.findMany({
      where: {
        id: {
          in: topicIds,
        },
      },
      select: {
        id: true,
        name: true,
        ListInTopic: {
          select: {
            index: true,
            list: {
              select: {
                id: true,
                name: true,
                cloudinaryImage: {
                  select: {
                    publicId: true,
                    version: true,
                  },
                },
              },
            },
          },
          orderBy: {
            index: "asc",
          },
        },
      },
    });

    const sortedResponse = response.sort((a, b) => {
      const indexA = topicIds.indexOf(a.id);
      const indexB = topicIds.indexOf(b.id);
      return indexA - indexB;
    });

    return CreateResponse<ApiRequestTypes["/list/getHomeLists"]["response"]["data"]>({
      status: 200,
      data: sortedResponse,
    });
  });
