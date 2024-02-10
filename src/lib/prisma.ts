import {PrismaClient} from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient({log: ["error", "info", "warn"]});
};

const prisma = prismaClientSingleton();

export default prisma;
