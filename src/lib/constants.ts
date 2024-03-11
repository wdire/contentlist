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

// API
export const CLOUDINARY_PUBLIC_ID_SUFFIX = "list_thumb_";
export const CLOUDINARY_LIST_THUMBS_FOLDER_NAME = `${process.env.VERCEL_ENV !== "production" ? "dev_" : ""}list_thumbnails`;
