import {TmdbMultiSearchResult} from "@/api/lib/schemas/tmdb.schema";
import {
  GetCharacterListQuery,
  GetMediaListQuery,
  MediaType as AnilistGeneratedMediaType,
} from "@/services/anilistApi/anilist.generated";
import {ApiRequestTypes} from "@/api/lib/schemas/index.schema";
import {WikipediaRequestTypes} from "@/services/wikipediaApi/wikipediaApi.schema";
import {ContentInfoType} from "../types/list.type";
import {IGDB_IMAGE_URL_BASE} from "../constants";

export const getContentInfoFromTmdb = ({
  data,
}: {
  data: TmdbMultiSearchResult[];
}): ContentInfoType[] => {
  return data.map((item) => {
    const returnData: ContentInfoType = {
      name: "",
      image_url: "",
      source: "tmdb",
      tmdb: {
        id: item.id,
        media_type: item.media_type,
      },
    };

    if (item.media_type === "movie") {
      returnData.name = item.title;
      returnData.image_url = item.poster_path;
    } else if (item.media_type === "tv") {
      returnData.name = item.name;
      returnData.image_url = item.poster_path;
    } else if (item.media_type === "person") {
      returnData.name = item.name;
      returnData.image_url = item.profile_path;
    }

    if (returnData.image_url) {
      returnData.image_url = `https://image.tmdb.org/t/p/w300${returnData.image_url}`;
    }

    return returnData;
  });
};

export const getContentInfoFromAnilistMedia = ({
  data,
}: {
  data: GetMediaListQuery;
}): ContentInfoType[] => {
  return (
    data.Page?.media?.map((item) => {
      if ((item?.title?.english || item?.title?.native) && item?.type && item?.coverImage?.large) {
        const returnData: ContentInfoType = {
          name: item.title.english || item.title.native || "",
          image_url: item.coverImage.large,
          source: "anilist",
          anilist: {
            id: item.id,
            type: item.type === AnilistGeneratedMediaType.Anime ? "anime" : "manga",
          },
        };

        return returnData;
      }

      return null;
    }) || []
  ).filter((item): item is ContentInfoType => item !== null);
};

export const getContentInfoFromAnilistCharacter = ({
  data,
}: {
  data: GetCharacterListQuery;
}): ContentInfoType[] => {
  return (
    data.Page?.characters?.map((item) => {
      if (item?.image?.large && item?.name?.full) {
        const returnData: ContentInfoType = {
          name: item.name.full,
          image_url: item.image.large,
          source: "anilist",
          anilist: {
            id: item.id,
            type: "character",
          },
        };

        return returnData;
      }

      return null;
    }) || []
  ).filter((item): item is ContentInfoType => item !== null);
};

export const getContentInfoFromIgdbGame = ({
  data,
}: {
  data: ApiRequestTypes["/igdb/search-games"]["types"]["IgdbGamesSearchResultItem"][];
}): ContentInfoType[] => {
  return (
    data?.map((item) => {
      if (item?.id && item?.name && item?.cover?.image_id) {
        const returnData: ContentInfoType = {
          name: item.name,
          image_url: `${IGDB_IMAGE_URL_BASE + item.cover.image_id}.png`,
          source: "igdb",
          igdb: {
            id: item.id,
          },
        };

        return returnData;
      }

      return null;
    }) || []
  ).filter((item): item is ContentInfoType => item !== null);
};

export const getContentInfoFromWikipedia = ({
  data,
}: {
  data: WikipediaRequestTypes["search"]["types"]["WikipediaSearchPageResultItem"][];
}): ContentInfoType[] => {
  return (
    data?.map((item) => {
      if (item?.pageid && item?.title && item?.thumbnail?.source) {
        const returnData: ContentInfoType = {
          name: item.title,
          image_url: item?.thumbnail?.source,
          source: "wikipedia",
          wikipedia: {
            id: item.pageid,
          },
        };

        return returnData;
      }

      return null;
    }) || []
  ).filter((item): item is ContentInfoType => item !== null);
};
