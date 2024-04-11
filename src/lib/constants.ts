import {Content, Row} from "./types/list.type";

export const STORAGE_ROW_ID = "__STORAGE_ROW__";
export const TRASH_BOX_ID = "__TRASH_BOX__";

export const LIST_ROWS_ID = "__LIST_ROWS__";

export const LIST_MAX_ROW_LENGTH = 10;

// PrismaJson.RowsType["color"][]
export const rowColors = [
  "black",
  "blue",
  "gray",
  "green",
  "light-blue",
  "light-orange",
  "lime-green",
  "magenta",
  "orange",
  "purple",
  "red",
  "silver",
  "turquoise",
  "white",
  "yellow",
] as const;

export const IGDB_IMAGE_URL_BASE = "https://images.igdb.com/igdb/image/upload/t_cover_big/";

export const LEGAL_LINKS = {
  privacy_policy: "https://www.iubenda.com/privacy-policy/93141495",
  cookie_policy: "https://www.iubenda.com/privacy-policy/93141495/cookie-policy",
  terms_of_service: "/legal/terms-of-service",
};

export const LOCALMODE_KEY = "_local_lists_";

export const REMEMBERED_STATES_KEYS = {
  CONTENT_SIZE: "state_content_size",
  SHOW_NAMES: "state_show_names",
  UNSAVED_CHANGES: "state_unsaved",
};

export type REMEMBERED_STATES_TYPES = {
  CONTENT_SIZE: "1x" | "2x" | "3x";
  SHOW_NAMES: boolean | undefined;
  UNSAVED_CHANGES?:
    | {
        last_update: Date;
        hasUnsavedChanges: boolean;
        contents: Content[] | undefined;
        rows: Row[] | undefined;
      }
    | undefined;
};

export const APP_BASE_URL = (() => {
  if (process.env.VERCEL_ENV === "production") {
    return "https://www.contentlist.space";
  }

  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  return "https://dev.contentlist.space";
})();

// API
export const CLOUDINARY_PUBLIC_ID_SUFFIX = "list_thumb_";
export const CLOUDINARY_LIST_THUMBS_FOLDER_NAME = `${process.env.VERCEL_ENV !== "production" ? "dev_" : ""}list_thumbnails`;

export const ALLOWED_HOSTNAMES = [
  "image.tmdb.org",
  "images.igdb.com",
  "s4.anilist.co",
  "upload.wikimedia.org",
  "logo.clearbit.com",
];

export const MAX_LENGTHS = {
  list_title: 65,
  max_rows: 10,
  max_contents: 200,
  image_contents: 500,
  user_list_max_copy: 1,
  content_name_length: 100,
  max_num_id: 1e10,
  fe_generated_id: 10,
  max_row_name_length: 55,
};

export const CONTENT_IMAGE_BASES = {
  tmdb: "https://image.tmdb.org/t/p/w300/",
  igdb: "https://images.igdb.com/igdb/image/upload/t_cover_big/",
  anilist: {
    anime: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/",
    manga: "https://s4.anilist.co/file/anilistcdn/media/manga/cover/medium/",
    character: "https://s4.anilist.co/file/anilistcdn/character/large/",
  },
  clearbit: "https://logo.clearbit.com/",
} as const;

export const CONTENTCARD_SIZE_CLASSES = {
  "min-h-": "min-h-[60px]",
  "md:min-h-": "md:min-h-[86px]",

  _1x: {
    "w-": "w-[60px]",
    "max-h-": "max-h-[90px]",
    //
    "md:w-": "md:w-[86px]",
    "md:max-h-": "md:max-h-[129px]",
  },
  _2x: {
    "w-": "w-[84px]",
    "max-h-": "max-h-[126px]",
    //
    "md:w-": "md:w-[100px]",
    "md:max-h-": "md:max-h-[150px]",
  },
  _3x: {
    "w-": "w-[126px]",
    "max-h-": "max-h-[189px]",
    //
    "md:w-": "md:w-[116px]",
    "md:max-h-": "md:max-h-[174px]",
  },
} as const;
