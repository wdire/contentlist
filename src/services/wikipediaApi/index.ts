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
          exportschema: "0.10",
          generator: "prefixsearch",
          formatversion: "2",
          pithumbsize: "500",
          pilicense: "any",
          gpssearch: query,
          gpsnamespace: "0",
          origin: "*",
        },
        method: "GET",
      }),
    }),
  }),
});

export const {initiate: wikipediaSearchInitiate} = wikipediaApi.endpoints.search;
