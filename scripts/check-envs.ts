import dotenv from "dotenv";

dotenv.config();

const REQUIRED_ENVS = [
  "DATABASE_URL",
  "DIRECT_URL",
  "TMDB_API_KEY",
  "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
  "CLERK_SECRET_KEY",
  "CLERK_WEBHOOK_SECRET",
  "NEXT_PUBLIC_CLERK_SIGN_IN_URL",
  "NEXT_PUBLIC_CLERK_SIGN_UP_URL",
  "NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL",
  "NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL",
  "HOME_TOPIC_IDS",
];

const notFoundInEnv: string[] = [];

REQUIRED_ENVS.forEach((envKey) => {
  if (!process.env[envKey]) {
    notFoundInEnv.push(envKey);
  }
});

if (notFoundInEnv.length > 0) {
  throw new Error(
    `Some required environment variables not found: \n[\n${notFoundInEnv.join("\n")}\n]`,
  );
}

try {
  const persedTopicIds: number[] = JSON.parse(process.env.HOME_TOPIC_IDS);

  if (!Array.isArray(persedTopicIds) || persedTopicIds.every((id) => typeof id !== "number")) {
    throw Error("'HOME_TOPIC_IDS' environment needs to be array of ids. Example: [1,2,3]");
  }
} catch {
  throw Error("'HOME_TOPIC_IDS' environment needs to be array of ids. Example: [1,2,3]");
}

console.log("✔ check-envs.ts: All the needed environment variables exists ");
console.log(`- Node.js version ${process.version}`);
