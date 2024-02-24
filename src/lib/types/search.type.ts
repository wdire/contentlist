import {MediaType} from "./list.type";

export type SearchSource = "tmdb" | "anilist" | "igdb";

export type SearchSelectionType = {
  id: number;
  name: string;
  image_url: string;
  media_type: MediaType;
};
