import {Row} from "./types/list.type";
import {SearchSource} from "./types/search.type";
import {generateId} from "./utils/helper.utils";

export const defaultNewListInfo: {rows: Row[]} = {
  rows: [
    {
      id: generateId(),
      title: "S",
      color: "red",
    },
    {
      id: generateId(),
      title: "A",
      color: "orange",
    },
    {
      id: generateId(),
      title: "B",
      color: "light-orange",
    },
    {
      id: generateId(),
      title: "C",
      color: "yellow",
    },
    {
      id: generateId(),
      title: "D",
      color: "lime-green",
    },
  ],
};

export const searchSources: {value: SearchSource; label: string}[] = [
  {value: "tmdb", label: "Movie/TV/Person - TMDB"},
  {value: "anilist_anime", label: "Anime - AniList"},
  {value: "anilist_manga", label: "Manga - AniList"},
  {value: "anilist_character", label: "Character - AniList"},
  {value: "igdb", label: "Game - IGDB"},
];
