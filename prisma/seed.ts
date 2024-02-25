import prisma from "@/lib/prisma";
import {Prisma} from "@prisma/client";

const listData: Prisma.ListCreateInput[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((e) => ({
  name: `Animes ${e}`,
  user: {
    connect: {
      id: "user_2cPMYROVpKIfiWfQBYQBQnmeexR",
    },
  },
  contentsData: {
    rows: [
      {
        name: "S",
        row_id: "S",
        color: "red",
        contents: [
          {
            name: "One Piece",
            source: "tmdb",
            image_url: "https://image.tmdb.org/t/p/w200/cMD9Ygz11zjJzAovURpO75Qg7rT.jpg",
          },
          {
            name: "Hunter X Hunter",
            source: "tmdb",
            image_url: "https://image.tmdb.org/t/p/w200/ucpgmUR1h5Te1BYegKItoPjOeF7.jpg",
          },
        ],
      },
      {
        name: "A",
        row_id: "A",
        color: "blue",
        contents: [
          {
            name: "One Punch Man",
            source: "tmdb",
            image_url: "https://image.tmdb.org/t/p/w200/bS6GeCRInMRl6oQN6czCqPFdcHN.jpg",
          },
          {
            name: "Death Note",
            source: "tmdb",
            image_url: "https://image.tmdb.org/t/p/w200/tCZFfYTIwrR7n94J6G14Y4hAFU6.jpg",
          },
          {
            name: "Attack on Titan",
            source: "tmdb",
            image_url: "https://image.tmdb.org/t/p/w200/hTP1DtLGFamjfu8WqjnuQdP1n4i.jpg",
          },
        ],
      },
      {
        name: "B",
        color: "green",
        row_id: "B",
        contents: [],
      },
    ],
    storage: [],
  },
}));

async function main() {
  console.log(`Start seeding ...`);

  await Promise.all(
    listData.map(async (l) => {
      const list = await prisma.list.create({
        data: l,
      });
      console.log(`Created list with name: ${list.name}`);
    }),
  );

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
