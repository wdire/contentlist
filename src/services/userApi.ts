import {createApi} from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "@/lib/rtkBaseQueries/axiosBaseQuery";
import {ApiRequestTypes} from "@/api/lib/schemas/index.schema";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: axiosBaseQuery({baseUrl: "/api"}),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    get: builder.query<
      ApiRequestTypes["/user/get"]["response"],
      ApiRequestTypes["/user/get"]["params"]
    >({
      query: ({username}) => ({
        url: `/user/get/${username}`,
        method: "GET",
      }),
      providesTags: (result) => [{type: "User", id: result?.data?.id}],
    }),
  }),
});

export const {useGetQuery} = userApi;
