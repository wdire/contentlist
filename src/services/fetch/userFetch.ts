import prisma from "@/lib/prisma";
import {Prisma} from "@prisma/client";

export type UserByUsernameResponse = Prisma.UserGetPayload<{
  select: {
    id: true;
    username: true;
    imageUrl: true;
  };
}>;

export const getUserByUsername = async (username: string) => {
  const response: UserByUsernameResponse | null = await prisma.user.findFirst({
    where: {
      username,
    },
    select: {
      id: true,
      username: true,
      imageUrl: true,
    },
  });

  return response;
};
