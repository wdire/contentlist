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

export const ContentSourceType = ["tmdb", "anilist", "igdb"] as const;

export type ContentSourceType = (typeof ContentSourceType)[number];

export type ContentInfoType = PrismaJson.ContentType;
