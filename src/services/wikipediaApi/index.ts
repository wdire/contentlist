import {createApi} from "@reduxjs/toolkit/query";
import axiosBaseQuery from "@/lib/rtkBaseQueries/axiosBaseQuery";
import {WikipediaRequestTypes} from "./wikipediaApi.schema";

export const wikipediaApi = createApi({
  reducerPath: "wikipediaApi",
  baseQuery: axiosBaseQuery({baseUrl: "https://en.wikipedia.org/w/api.php"}),
  tagTypes: ["Wikipedia"],
  endpoints: (builder) => ({
    search: builder.query<
      WikipediaRequestTypes["search"]["response"],
      WikipediaRequestTypes["search"]["params"]
    >({
      query: ({query}) => ({
        url: "",
        params: {
          action: "query",
          format: "json",
          prop: "pageimages",
          list: "prefixsearch",
          generator: "prefixsearch",
          redirects: "1",
          piprop: "thumbnail",
          pithumbsize: "200",
          pilicense: "any",
          pssearch: query,
          psnamespace: "0",
          gpssearch: query,
          gpsnamespace: "0",
          formatversion: "2",
          origin: "*",
        },
        method: "GET",
      }),
      transformResponse: (response: WikipediaRequestTypes["search"]["response"]) => {
        response.query.pages.sort((a, b) => a.index - b.index);

        return response;
      },
    }),
  }),
});

export const {initiate: wikipediaSearchInitiate} = wikipediaApi.endpoints.search;
