import prisma from "@/lib/prisma";
import {Prisma} from "@prisma/client";

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
}> | null;

export const getListById = async (id: string | number) => {
  const response: ListByIdResponse = await prisma.list.findFirst({
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
};
