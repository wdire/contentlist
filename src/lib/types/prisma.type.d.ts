declare global {
  namespace PrismaJson {
    type RowsType = {
      name: string;
      row_id: string;
      color:
        | "red"
        | "orange"
        | "light-orange"
        | "yellow"
        | "lime-green"
        | "green"
        | "turquoise"
        | "light-blue"
        | "blue"
        | "magenta"
        | "purple"
        | "black"
        | "gray"
        | "silver"
        | "white";
      contents: ContentType[];
    };

    type ContentType = {
      name: string;
      image_url: string;
      source: "TMDB";
      tmdb?: TmdbDetailsType | null;
    };

    type TmdbDetailsType = {
      tmdb_id: number;
      tmdb_media_type: string;
    };
  }
}

export {PrismaJson};
