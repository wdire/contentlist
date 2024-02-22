import {Prisma} from "@prisma/client";
import {z} from "zod";
import {ResponseBodyType} from "../response.api";
import {ZodTypeOf} from "../index.type.api";

export const UserSchemas = {
  "/user/get": {
    params: z.object({
      username: z.string(),
    }),
  },
};

export type UserRequestTypes = {
  "/user/get": {
    params: ZodTypeOf<(typeof UserSchemas)["/user/get"]["params"]>;
    response: ResponseBodyType<Prisma.UserGetPayload<object>>;
  };
};
