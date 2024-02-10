export type Id = string | number;

export type Row = {
  id: Id;
  title: string;
  color: PrismaJson.RowsType["color"];
};

export type Content = {
  id: Id;
  rowId: Id;
  data: {
    source: "TMDB";
    tmdb?: {
      id: number;
      media_type: MediaType;
    };
    name: string;
    image_url: string;
  };
};

export type MediaType = "movie" | "tv" | "person";
