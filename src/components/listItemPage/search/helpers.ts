import {TmdbMultiSearchResult} from "@/api/lib/schemas/tmdb.schema";
import {SearchSelectionType} from "@/lib/types/search.type";

export const getInfoByMedia = ({data}: {data: TmdbMultiSearchResult}): SearchSelectionType => {
  const returnData = {
    id: data.id,
    name: "",
    image_url: "",
    media_type: data.media_type,
  };

  if (data.media_type === "movie") {
    returnData.name = data.title;
    returnData.image_url = data.poster_path;
  } else if (data.media_type === "tv") {
    returnData.name = data.name;
    returnData.image_url = data.poster_path;
  } else if (data.media_type === "person") {
    returnData.name = data.name;
    returnData.image_url = data.profile_path;
  }

  if (returnData.image_url) {
    returnData.image_url = `https://image.tmdb.org/t/p/w200${returnData.image_url}`;
  }

  return returnData;
};
