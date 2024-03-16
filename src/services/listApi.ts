import {createApi} from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "@/lib/rtkBaseQueries/axiosBaseQuery";
import {ListRequestTypes} from "@/api/lib/schemas/list.schema";
import {ApiRequestTypes} from "@/api/lib/schemas/index.schema";
import {bodyConvertFormData} from "@/lib/utils/formdata.utils";

export const listApi = createApi({
  reducerPath: "listApi",
  baseQuery: axiosBaseQuery({baseUrl: "/api"}),
  tagTypes: ["List"],
  endpoints: (builder) => ({
    getHomeLists: builder.query<ListRequestTypes["/list/getHomeLists"]["response"], void>({
      query: () => ({
        url: "/list/getHomeLists",
        method: "GET",
      }),
      providesTags: () => [{type: "List", id: "ALL"}],
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
        formdata: ListRequestTypes["/list/update"]["formdata"];
      }
    >({
      query: ({formdata, params}) => ({
        url: `/list/update/${params.id}`,
        method: "PUT",
        data: bodyConvertFormData({
          items: {
            body: formdata.body,
            ...(formdata.deleteImage ? {deleteImage: formdata.deleteImage} : {}),
          },
          files: [{key: "image", value: formdata.image as Blob}],
        }),
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
      ListRequestTypes["/list/create"]["formdata"]
    >({
      query: (formdata) => {
        let data;

        if ("copyListId" in formdata) {
          data = bodyConvertFormData({
            items: {
              contentsData: formdata.contentsData,
              copyListId: formdata.copyListId,
            },
            files: [{key: "image", value: formdata.image as Blob}],
          });
        } else {
          data = bodyConvertFormData({
            items: {
              name: formdata.name,
            },
          });
        }

        return {
          url: `/list/create`,
          method: "POST",
          data,
        };
      },
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
  useGetHomeListsQuery,
  useGetQuery,
  useUpdateMutation,
  useDeleteMutation,
  useCreateMutation,
  useGetAllByUserIdQuery,
  usePrefetch,
} = listApi;
