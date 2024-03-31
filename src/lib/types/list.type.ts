export type Id = string | number;

export type Row = {
  id: Id;
  title: string;
  color: PrismaJson.RowsType["color"];
};

export type Content = {
  id: Id;
  rowId: Id;
  data: ContentInfoType;
};

export const ContentSourceType = ["tmdb", "anilist", "igdb", "wikipedia", "clearbit"] as const;

export type ContentSourceType = (typeof ContentSourceType)[number];

export const ContentSourceName: {[key in ContentSourceType]: string} = {
  anilist: "AniList",
  igdb: "IGDB",
  tmdb: "TMDB",
  wikipedia: "Wikipedia",
  clearbit: "Clearbit",
};

export type ContentInfoType = PrismaJson.ContentType;
