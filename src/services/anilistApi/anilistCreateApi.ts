import {createApi} from "@reduxjs/toolkit/query";
import {graphqlRequestBaseQuery} from "@rtk-query/graphql-request-base-query";
import {GraphQLClient} from "graphql-request";

const client = new GraphQLClient("https://graphql.anilist.co");

export const anilistCreateApi = createApi({
  reducerPath: "anilistApi",
  baseQuery: graphqlRequestBaseQuery({client}),
  endpoints: () => ({}),
});
