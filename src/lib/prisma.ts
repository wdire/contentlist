import {PrismaClient} from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient({log: ["error", "info", "warn"]});
};

declare global {
  // eslint-disable-next-line vars-on-top, no-var
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
