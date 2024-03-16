import prisma from "@/lib/prisma";
import {Prisma} from "@prisma/client";
import {cache} from "react";

export type ListByIdResponse = Prisma.ListGetPayload<{
  include: {
    user: true;
    cloudinaryImage: {
      select: {
        publicId: true;
        version: true;
      };
    };
  };
}>;

export const getListById = cache(async (id: string | number) => {
  const response: ListByIdResponse | null = await prisma.list.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      user: true,
      cloudinaryImage: {
        select: {
          publicId: true,
          version: true,
        },
      },
    },
  });

  return response;
});

export type ListsByUserIdResponse = Prisma.ListGetPayload<{
  include: {
    cloudinaryImage: {
      select: {
        publicId: true;
        version: true;
      };
    };
  };
}>[];

export const getListsByUserId = cache(async (userId: string) => {
  const response: ListsByUserIdResponse | null = await prisma.list.findMany({
    where: {
      userId,
    },
    include: {
      cloudinaryImage: {
        select: {
          publicId: true,
          version: true,
        },
      },
    },
    orderBy: {
      updated_at: "desc",
    },
  });

  return response;
});

export type ListHomeListsResponse = Prisma.TopicGetPayload<{
  select: {
    id: true;
    name: true;
    ListInTopic: {
      select: {
        index: true;
        list: {
          select: {
            id: true;
            name: true;
            cloudinaryImage: {
              select: {
                publicId: true;
                version: true;
              };
            };
          };
        };
      };
    };
  };
}>[];

export const getHomeLists = cache(async () => {
  const topicIds: number[] = JSON.parse(process.env.HOME_TOPIC_IDS) || [];

  const response: ListHomeListsResponse = await prisma.topic.findMany({
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

  return sortedResponse;
});
