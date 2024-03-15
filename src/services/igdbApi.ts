import {createApi} from "@reduxjs/toolkit/query";
import axiosBaseQuery from "@/lib/rtkBaseQueries/axiosBaseQuery";
import {ApiRequestTypes} from "@/api/lib/schemas/index.schema";

export const igdbApi = createApi({
  reducerPath: "igdbApi",
  baseQuery: axiosBaseQuery({baseUrl: "/api/igdb"}),
  tagTypes: ["Igdb"],
  endpoints: (builder) => ({
    searchGames: builder.query<
      ApiRequestTypes["/igdb/search-games"]["response"],
      ApiRequestTypes["/igdb/search-games"]["body"]
    >({
      query: ({query}) => ({
        url: "/search-games",
        data: {
          query,
        },
        method: "POST",
      }),
    }),
  }),
});

export const {initiate: igdbSearchGamesInitiate} = igdbApi.endpoints.searchGames;
