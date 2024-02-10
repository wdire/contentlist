declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      DATABASE_URL: string;
      DIRECT_URL: string;
      TMDB_API_KEY: string;
    }
  }
}

export {};
