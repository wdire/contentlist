import {CONTENT_IMAGE_BASES} from "@/lib/constants";

export const getUrlParams = (fullUrl: string) => {
  const url = new URL(fullUrl);
  const paramsObj: {[key: string]: string} = {};

  Array.from(url.searchParams.entries()).forEach(([key, value]) => {
    paramsObj[key] = value;
  });

  return paramsObj;
};

export const cutContentImageUrlBase = (content: PrismaJson.ContentType) => {
  if (
    (["tmdb", "anilist", "igdb", "clearbit"] as PrismaJson.ContentType["source"][]).includes(
      content.source,
    )
  ) {
    content.image_url = content.image_url.substring(content.image_url.lastIndexOf("/") + 1);
  }
};

export const addCuttedContentImageUrl = (content: PrismaJson.ContentType) => {
  if (content.source === "tmdb") {
    content.image_url = CONTENT_IMAGE_BASES.tmdb + content.image_url;
  } else if (content.source === "igdb") {
    content.image_url = CONTENT_IMAGE_BASES.igdb + content.image_url;
  } else if (content.source === "anilist") {
    if (content.anilist?.type === "anime") {
      content.image_url = CONTENT_IMAGE_BASES.anilist.anime + content.image_url;
    } else if (content.anilist?.type === "manga") {
      content.image_url = CONTENT_IMAGE_BASES.anilist.manga + content.image_url;
    } else if (content.anilist?.type === "character") {
      content.image_url = CONTENT_IMAGE_BASES.anilist.character + content.image_url;
    }
  } else if (content.source === "clearbit") {
    content.image_url = CONTENT_IMAGE_BASES.clearbit + content.image_url;
  }
};

export const cutContentImageUrlBaseAll = (contents: PrismaJson.ContentType[]) => {
  contents.forEach((content) => cutContentImageUrlBase(content));
};

export const addCuttedContentImageUrlAll = (contents: PrismaJson.ContentType[]) => {
  contents.forEach((content) => addCuttedContentImageUrl(content));
};
