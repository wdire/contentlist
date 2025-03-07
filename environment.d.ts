declare global {
  interface Window {
    eruda?: {
      init: () => void;
    };
  }

  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      DATABASE_URL: string;
      DIRECT_URL: string;
      TMDB_API_KEY: string;
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
      CLERK_SECRET_KEY: string;
      CLERK_WEBHOOK_SECRET: string;

      VERCEL_ENV: "production" | "development" | "preview";

      NEXT_PUBLIC_CLERK_SIGN_IN_URL: string;
      NEXT_PUBLIC_CLERK_SIGN_UP_URL: string;
      NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: string;
      NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: string;

      CLOUDINARY_CLOUD_NAME: string;
      CLOUDINARY_API_KEY: string;
      CLOUDINARY_API_SECRET: string;

      TWITCH_CLIENT_ID: string;
      TWITCH_CLIENT_SECRET: string;

      /**
       * Array of topic ids to show on home page
       * Will be used with JSON.parse
       * Example: [1,2,3]
       */
      HOME_TOPIC_IDS: string;
    }
  }
}

export {};
