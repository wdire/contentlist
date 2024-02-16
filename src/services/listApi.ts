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

      // Change state with updated value instead of refetching. Pessimistic update
      onQueryStarted: async ({params: {id}}, {dispatch, queryFulfilled}) => {
        try {
          const {data: updatedList} = await queryFulfilled;
          dispatch(
            listApi.util.updateQueryData("get", {id}, (draft) => {
              Object.assign(draft, updatedList);
            }),
          );
        } catch {
          //
        }
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
  }),
});

export const {useGetAllQuery, useGetQuery, useUpdateMutation, useDeleteMutation, usePrefetch} =
  listApi;
