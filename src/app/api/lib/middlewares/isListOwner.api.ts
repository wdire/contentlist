import prisma from "@/lib/prisma";
import {currentUser} from "@clerk/nextjs";
import {Middleware} from "../runMiddlewares.api";
import {CreateResponse} from "../response.api";

const isListOwner =
  (listId: number): Middleware =>
  async (next) => {
    const user = await currentUser();

    if (!user) {
      return CreateResponse({status: 401, message: "isListOwner: user not found"});
    }

    const response = await prisma.list.findUnique({
      where: {
        id: listId,
      },
    });

    if (response?.userId === user.id) {
      return next();
    }

    return CreateResponse({status: 401, message: "isListOwner: user doesn't own the list"});
  };

export default isListOwner;
