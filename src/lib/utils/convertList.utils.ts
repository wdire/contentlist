import {InitListProps, ListState} from "@/store/features/list/listSlice.type";
import {UserResource} from "@clerk/types";
import {ApiRequestTypes} from "@/api/lib/schemas/index.schema";
import {ListByIdResponse} from "@/services/actions/list.actions";
import {Content, ContentInfoType} from "../types/list.type";
import {generateId} from "./helper.utils";
import {STORAGE_ROW_ID} from "../constants";
import {defaultNewListInfo} from "../config";

export const convertDBListToRedux = ({
  listGetData,
  currentUser,
}: {
  listGetData: ListByIdResponse;
  currentUser: UserResource | null | undefined;
}): InitListProps => {
  if (!listGetData) {
    throw Error("No listGetData found");
  }

  const {id, name, user, cloudinaryImage, contentsData, imageContents} = listGetData;

  const list: InitListProps = {
    rows: [],
    contents: [],
    info: {
      id,
      name,
      isListOwner: currentUser ? currentUser.id === user.id : false,
      owner: {
        id: user.id,
        username: user.username,
      },
      cloudinaryImage,
      imageContents,
    },
    startData: {
      name,
      imageContents,
      rows: [],
      contents: [],
    },
    isLocalMode: false,
  };

  const {rows, contents} = convertDBContentsDataToRedux({
    contentsData,
  });

  list.rows = rows;
  list.contents = contents;
  list.startData.contents = contents;
  list.startData.rows = rows;

  return list;
};

export const convertReduxListForDBUpdate = (
  list: ListState,
): Pick<ApiRequestTypes["/list/update"], "formdata" | "params"> => {
  const body: ApiRequestTypes["/list/update"]["formdata"]["body"] = {
    name: list.info.name || "",
    rows: list.rows.map((r) => {
      return {
        name: r.title,
        row_id: `${r.id}`,
        color: r.color,
        contents:
          list.contents
            .filter((c) => c.rowId === r.id)
            .map((c) => {
              const newC: ContentInfoType = {
                name: c.data.name,
                image_url: c.data.image_url,
                source: c.data.source,
              };

              if (c.data.notPoster) {
                newC.notPoster = c.data.notPoster;
              }

              if (c.data.square) {
                newC.square = c.data.square;
              }

              if (c.data.source === "tmdb") {
                newC.tmdb = c.data.tmdb;
              } else if (c.data.source === "anilist") {
                newC.anilist = c.data.anilist;
              } else if (c.data.source === "igdb") {
                newC.igdb = c.data.igdb;
              } else if (c.data.source === "wikipedia") {
                newC.wikipedia = c.data.wikipedia;
              } else if (c.data.source === "clearbit") {
                newC.clearbit = c.data.clearbit;
              } else if (c.data.source === "text") {
                newC.text = c.data.text;
              } else {
                console.error("Content source not found");
              }

              return newC;
            }) || [],
      };
    }),
    storage: list.contents
      .filter((c) => c.rowId === STORAGE_ROW_ID)
      .map((c) => {
        const newC: ContentInfoType = {
          name: c.data.name,
          image_url: c.data.image_url,
          source: c.data.source,
        };

        if (c.data.notPoster) {
          newC.notPoster = c.data.notPoster;
        }

        if (c.data.square) {
          newC.square = c.data.square;
        }

        if (c.data.source === "tmdb") {
          newC.tmdb = c.data.tmdb;
        } else if (c.data.source === "anilist") {
          newC.anilist = c.data.anilist;
        } else if (c.data.source === "igdb") {
          newC.igdb = c.data.igdb;
        } else if (c.data.source === "wikipedia") {
          newC.wikipedia = c.data.wikipedia;
        } else if (c.data.source === "clearbit") {
          newC.clearbit = c.data.clearbit;
        } else if (c.data.source === "text") {
          newC.text = c.data.text;
        } else {
          console.error("Content source not found");
        }

        return newC;
      }),
  };

  return {
    formdata: {
      body,
    },
    params: {
      id: list.info.id as number,
    },
  };
};

export const convertDBContentsDataToRedux = ({
  contentsData,
}: {
  contentsData: PrismaJson.ListData;
}): Pick<ListState, "rows" | "contents"> => {
  const {rows, storage} = contentsData;

  const list: Pick<ListState, "rows" | "contents"> = {
    rows: [],
    contents: [],
  };

  list.rows = rows.map((r) => {
    return {
      color: r.color,
      title: r.name,
      id: r.row_id,
    };
  });

  list.contents = rows
    .map((r) => {
      return (
        r?.contents?.map((c): Content => {
          return {
            id: generateId(),
            rowId: r.row_id,
            data: c,
          };
        }) || []
      );
    })
    .flat();

  list.contents = [
    ...list.contents,
    ...(storage.map((c): Content => {
      return {
        id: generateId(),
        rowId: STORAGE_ROW_ID,
        data: c,
      };
    }) || []),
  ];

  if (list.rows.length === 0) {
    list.rows = defaultNewListInfo.rows;

    if (list.contents.length > 0) {
      console.error("Got 0 rows but has contents");
    }
  }

  return list;
};
