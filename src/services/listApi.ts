import {createApi} from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "@/lib/axiosBaseQuery";
import {ListRequestTypes} from "@/api/lib/schemas/list.schema";
import {ApiRequestTypes} from "@/api/lib/schemas/index.schema";

export const listApi = createApi({
  reducerPath: "listApi",
  baseQuery: axiosBaseQuery({baseUrl: "/api"}),
  tagTypes: ["List"],
  endpoints: (builder) => ({
    getAll: builder.query<ListRequestTypes["/list/getAll"]["response"], void>({
      query: () => ({
        url: "/list/getAll",
        method: "GET",
      }),
      providesTags: (result) => [
        {type: "List", id: "ALL"},
        ...(result?.data?.map(({id}) => ({type: "List" as const, id})) || []),
      ],
    }),
    get: builder.query<
      ApiRequestTypes["/list/get"]["response"],
      ListRequestTypes["/list/get"]["params"]
    >({
      query: ({id}) => ({
        url: `/list/get/${id}`,
        method: "GET",
      }),
      providesTags: (result) => [{type: "List", id: result?.data?.id}],
    }),
    update: builder.mutation<
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
      invalidatesTags: (result) => {
        if (result) {
          return [{type: "List", id: result?.data?.id}];
        }
        return [];
      },
    }),
    delete: builder.mutation<
      ListRequestTypes["/list/delete"]["response"],
      ListRequestTypes["/list/delete"]["params"]
    >({
      query: ({id}) => ({
        url: `/list/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_r, _u, params) => {
        return [{type: "List", id: params.id}];
      },
    }),
    create: builder.mutation<
      ListRequestTypes["/list/create"]["response"],
      ListRequestTypes["/list/create"]["body"]
    >({
      query: (body) => ({
        url: `/list/create`,
        method: "POST",
        data: body,
      }),
      invalidatesTags: [{type: "List", id: "ALL"}],
    }),
    getAllByUserId: builder.query<
      ApiRequestTypes["/list/getAllByUserId"]["response"],
      ListRequestTypes["/list/getAllByUserId"]["params"]
    >({
      query: ({userId}) => ({
        url: `/list/getAllByUserId/${userId}`,
        method: "GET",
      }),
      providesTags: (result, _u, params) => [
        {type: "List", id: `USERS_LIST_${params.userId}`},
        ...(result?.data?.map(({id}) => ({type: "List" as const, id})) || []),
      ],
    }),
  }),
});

export const {
  useGetAllQuery,
  useGetQuery,
  useUpdateMutation,
  useDeleteMutation,
  useCreateMutation,
  useGetAllByUserIdQuery,
  usePrefetch,
} = listApi;
