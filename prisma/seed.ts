import prisma from "@/lib/prisma";
import {Prisma} from "@prisma/client";

const test_user_id = "user_2cPMYROVpKIfiWfQBYQBQnmbaxR";
const topic_id = 1;
const topic_name = "Anime";

const createUser = async () => {
  const user = await prisma.user.upsert({
    where: {
      id: test_user_id,
    },
    create: {
      id: test_user_id,
      email: "test@example.com",
      username: "test",
    },
    update: {
      id: test_user_id,
      email: "test@example.com",
      username: "test",
    },
  });

  console.log(`Created user ${user.username}`);
};

const createTopic = async () => {
  const topic = await prisma.topic.upsert({
    where: {
      id: topic_id,
    },
    create: {
      name: topic_name,
    },
    update: {
      name: topic_name,
    },
  });
  console.log(`Created topic ${topic.name}`);
};

const listInTopicData: Prisma.ListInTopicCreateInput[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
  (i) => ({
    index: i,
    topic: {
      connect: {
        id: topic_id,
      },
    },
    list: {
      create: {
        name: `Amazing List ${i}`,
        user: {
          connect: {
            id: test_user_id,
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
      },
    },
  }),
);

async function main() {
  console.log(`Start seeding ...`);

  await Promise.all([
    await createUser(),
    await createTopic(),
    ...listInTopicData.map(async (l) => {
      const list = await prisma.listInTopic.create({
        data: l,
      });
      console.log(`Created listInTopic, ${list.listId} ${list.topicId}`);
    }),
  ]);

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
