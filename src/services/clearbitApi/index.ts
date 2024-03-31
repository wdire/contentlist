import {createApi} from "@reduxjs/toolkit/query";
import axiosBaseQuery from "@/lib/rtkBaseQueries/axiosBaseQuery";
import {ClearbitRequestTypes} from "./clerbitApi.schema";

export const clearbitApi = createApi({
  reducerPath: "clearbitApi",
  baseQuery: axiosBaseQuery({baseUrl: "https://autocomplete.clearbit.com/v1/companies/suggest"}),
  tagTypes: ["clearbit"],
  endpoints: (builder) => ({
    autocomplete: builder.query<
      ClearbitRequestTypes["autocomplete"]["response"],
      ClearbitRequestTypes["autocomplete"]["params"]
    >({
      query: ({query}) => ({
        url: "",
        params: {
          query,
        },
        method: "GET",
      }),
    }),
  }),
});

export const {initiate: clearbitAutocompleteInitiate} = clearbitApi.endpoints.autocomplete;
