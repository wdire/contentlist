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
            ...(formdata?.body ? {body: formdata.body} : {}),
            ...(formdata.deleteImage ? {deleteImage: formdata.deleteImage} : {}),
            ...(formdata.imageContents ? {imageContents: formdata.imageContents} : {}),
          },
          files: [{key: "image", value: formdata.image as Blob}],
        }),
      }),
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
  }),
});

export const {useUpdateMutation, useDeleteMutation, useCreateMutation, usePrefetch} = listApi;
