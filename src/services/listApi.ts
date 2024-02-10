import {createApi} from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "@/lib/axiosBaseQuery";
import {ListRequestTypes} from "@/api/lib/schemas/list.schema";
import {ApiRequestTypes} from "@/api/lib/schemas/index.schema";

export const listApi = createApi({
  reducerPath: "listApi",
  baseQuery: axiosBaseQuery({baseUrl: "/api"}),
  tagTypes: ["ListApi"],
  endpoints: (builder) => ({
    getAll: builder.query<ListRequestTypes["/list/getAll"]["response"], void>({
      query: () => ({
        url: "/list/getAll",
        method: "GET",
      }),
    }),
    get: builder.query<
      ApiRequestTypes["/list/get"]["response"],
      ListRequestTypes["/list/get"]["params"]
    >({
      query: ({id}) => ({
        url: `/list/get/${id}`,
        method: "GET",
      }),
    }),
    update: builder.query<
      ApiRequestTypes["/list/update"]["response"],
      {
        params: ListRequestTypes["/list/update"]["params"];
        body: ListRequestTypes["/list/update"]["body"];
      }
    >({
      query: ({body, params}) => ({
        url: `/list/update/${params.id}`,
        method: "PUT",
        data: body,
      }),
    }),
  }),
});

export const {useGetAllQuery, useGetQuery, useLazyUpdateQuery, usePrefetch} = listApi;
