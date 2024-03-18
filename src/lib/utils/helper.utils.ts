import {TmdbMediaType} from "@/api/lib/schemas/tmdb.schema";
import {AnilistMediaType} from "@/services/anilistApi/anilist.type";
import {rowColors} from "../constants";
import {Content, Row} from "../types/list.type";

export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const randColor = () => {
  return rowColors[Math.floor(Math.random() * rowColors.length)];
};

export const ContentMediaName: {[key in TmdbMediaType | AnilistMediaType | "game"]: string} = {
  anime: "Anime",
  manga: "Manga",
  character: "Character",
  movie: "Movie",
  person: "Person",
  tv: "Tv",
  game: "Game",
};

export type ContentMediaName = keyof typeof ContentMediaName;

export const isListFirst12ContentsChanged = (
  startContents: Content[],
  currentContents: Content[],
) => {
  const lengthToCheck = Math.min(12, startContents.length);

  if (
    startContents.length < 12 &&
    currentContents.length < 12 &&
    currentContents.length !== startContents.length
  ) {
    return true;
  }

  for (let i = 0; i < lengthToCheck; i += 1) {
    if (
      (currentContents?.[i]?.id && startContents[i].id !== currentContents[i].id) ||
      startContents[i]?.rowId !== currentContents[i]?.rowId ||
      startContents[i].data?.name !== currentContents[i].data?.name
    ) {
      return true;
    }
  }

  return false;
};

export const createNewRow = (): Row => {
  return {
    color: "green",
    title: "NEW",
    id: generateId(),
  };
};
