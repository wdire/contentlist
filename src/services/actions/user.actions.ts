import prisma from "@/lib/prisma";
import {Prisma} from "@prisma/client";
import {cache} from "react";

export type UserByUsernameResponse = Prisma.UserGetPayload<{
  select: {
    id: true;
    username: true;
    imageUrl: true;
  };
}>;

export const getUserByUsername = cache(async (username: string) => {
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
});
