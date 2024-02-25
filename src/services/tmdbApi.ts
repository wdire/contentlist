import {createApi} from "@reduxjs/toolkit/query";
import axiosBaseQuery from "@/lib/rtkBaseQueries/axiosBaseQuery";
import {ApiRequestTypes} from "@/api/lib/schemas/index.schema";

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: axiosBaseQuery({baseUrl: "/api/tmdb"}),
  tagTypes: ["Tmdb"],
  endpoints: (builder) => ({
    searchMulti: builder.query<
      ApiRequestTypes["/tmdb/search/multi"]["response"],
      ApiRequestTypes["/tmdb/search/multi"]["params"]
    >({
      query: ({query}) => ({
        url: "/search/multi",
        params: {
          query,
        },
        method: "GET",
      }),
      transformResponse: (response: ApiRequestTypes["/tmdb/search/multi"]["response"]) => {
        // Exclude contents with no image
        return {
          ...response,
          data: {
            ...response.data,
            results: (response?.data?.results ?? []).filter((result) => {
              if (result.media_type === "person") {
                return result.profile_path;
              }
              if (result.media_type === "tv" || result.media_type === "movie") {
                return result.poster_path;
              }

              return true;
            }),
          },
        };
      },
    }),
  }),
});
