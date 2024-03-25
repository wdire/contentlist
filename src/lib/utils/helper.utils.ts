import {TmdbMediaType} from "@/api/lib/schemas/tmdb.schema";
import {AnilistMediaType} from "@/services/anilistApi/anilist.type";
import {rowColors, STORAGE_ROW_ID} from "../constants";
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

export const getContentMediaType = (content: Content["data"]): ContentMediaName | null => {
  if (content.source === "anilist") {
    return content.anilist?.type as ContentMediaName;
  }
  if (content.source === "tmdb") {
    return content.tmdb?.media_type as ContentMediaName;
  }
  if (content.source === "igdb") {
    return "game" as ContentMediaName;
  }

  return null;
};

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

export const copyToClipboard = async (text: string) => {
  if (!navigator?.clipboard) {
    console.warn("Clipboard not supported");
    return false;
  }

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.warn("Copy to clipboard failed", error);
    return null;
  }
};

export const getListFirst12ContentsInfo = (contents: Content[]): string | Content => {
  let noIdContent: false | Content = false;

  const lengthToCheck = Math.min(12, contents.length);

  const imageContents: string[] = [];

  for (let i = 0; i < lengthToCheck; i += 1) {
    const content = contents[i];
    const contentId = content.data[content.data.source]?.id;
    if (!contentId) {
      noIdContent = content;
    } else {
      imageContents.push(`${content.data.source}:${content.data[content.data.source]?.id}`);
    }
  }

  if (noIdContent) {
    console.error("No content id", noIdContent);
    return noIdContent;
  }

  return imageContents.join(",");
};

/**
 * While drag and dropping contents, they are ordered by row id, but not ordered among themselves.
 * Which is enough for drag and drop to work but for other use cases checking content order, its a mess.
 *
 * This returns contents ordered starting from top rows.
 *
 * Example:
 *
 * Rows: [S, A, B, C]
 *
 * Input wrong contents: [["C1", B], ["C2", S], ["C3", B], ["C4", S]], ["C5", A]
 *
 * Output correct contents: [["C2", S], ["C4", S]], ["C5", A], ["C1", B], ["C3", B]
 */
export const orderContentsByRows = (contents: Content[], rows: Row[]) => {
  const orderedContents: Content[] = [];
  const contentsByRowId: Record<string, Content[]> = {};

  contents.forEach((content) => {
    const {rowId} = content;
    if (!contentsByRowId[rowId]) {
      contentsByRowId[rowId] = [];
    }
    contentsByRowId[rowId].push(content);
  });

  rows.forEach((row) => {
    const rowId = row.id;
    if (contentsByRowId[rowId]) {
      orderedContents.push(...contentsByRowId[rowId]);
    }
  });

  if (contentsByRowId[STORAGE_ROW_ID]) {
    orderedContents.push(...contentsByRowId[STORAGE_ROW_ID]);
  }

  // Test when wrongly placed content gets fixed

  /*
  console.log(
    "contents",
    JSON.parse(JSON.stringify(contents)).map((c: Content) => c.data.name),
  );
  console.log(
    "orderedContents",
    orderedContents.map((c) => c.data.name),
  );
  console.log(
    "-EQUAL:",
    JSON.parse(JSON.stringify(contents))
      .map((c: Content) => c.data.name)
      .join("") === orderedContents.map((c) => c.data.name).join(""),
  );
  */

  return orderedContents;
};

export const getListCloudinaryImage = ({
  publicId,
  version,
  original = false,
}: {
  publicId: string | undefined;
  version: string | undefined;
  original?: boolean;
}) => {
  return publicId && version
    ? `https://res.cloudinary.com/dgib2iezn/image/upload/${original ? "" : "w_300/f_auto/"}v${version}/${publicId}`
    : "/assets/no-image.png";
};

export const getExistingSearchResultIndexes = ({
  contents,
  findContents,
}: {
  contents: Content[];
  findContents: PrismaJson.ContentType[];
}): string[] => {
  const indexes: string[] = [];

  contents.forEach((content) => {
    findContents.forEach((findContent, index) => {
      if (
        content.data.name === findContent.name &&
        content.data.source === findContent.source &&
        content.data[content.data.source]?.id === findContent[findContent.source]?.id
      ) {
        indexes.push(`search_${index}`);
      }
    });
  });

  return indexes;
};
