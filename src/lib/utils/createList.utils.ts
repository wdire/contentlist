import {ListRequestTypes, ListSchemas} from "@/api/lib/schemas/list.schema";
import {InitListProps, ListState} from "@/store/features/list/listSlice";
import {UserResource} from "@clerk/types";
import {ApiRequestTypes} from "@/api/lib/schemas/index.schema";
import {ZodTypeOf} from "@/api/lib/index.type.api";
import {Content, ContentInfoType, Row} from "../types/list.type";
import {generateId} from "./helper.utils";
import {STORAGE_ROW_ID} from "../constants";
import {defaultNewListInfo} from "../config";

export const createListFromDb = async ({
  listGetData,
  currentUser,
}: {
  listGetData: ListRequestTypes["/list/get"]["response"]["data"];
  currentUser: UserResource | null | undefined;
}): Promise<InitListProps> => {
  if (!listGetData) {
    throw Error("No listGetData found");
  }

  const {
    id,
    name,
    user,
    contentsData: {rows, storage},
  } = listGetData;

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
    },
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

export const createListFromDnd = (
  list: ListState,
): Pick<ApiRequestTypes["/list/update"], "body" | "params"> => {
  const body: ZodTypeOf<(typeof ListSchemas)["/list/update"]["body"]> = {
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

              if (c.data.source === "tmdb") {
                newC.tmdb = c.data.tmdb;
              } else if (c.data.source === "anilist") {
                newC.anilist = c.data.anilist;
              } else if (c.data.source === "igdb") {
                newC.igdb = c.data.igdb;
              } else if (c.data.source === "wikipedia") {
                newC.wikipedia = c.data.wikipedia;
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

        if (c.data.source === "tmdb") {
          newC.tmdb = c.data.tmdb;
        } else if (c.data.source === "anilist") {
          newC.anilist = c.data.anilist;
        } else if (c.data.source === "igdb") {
          newC.igdb = c.data.igdb;
        } else if (c.data.source === "wikipedia") {
          newC.wikipedia = c.data.wikipedia;
        } else {
          console.error("Content source not found");
        }

        return newC;
      }),
  };

  return {
    body,
    params: {
      id: list.info.id as number,
    },
  };
};

export const createNewRow = (): Row => {
  return {
    color: "green",
    title: "NEW",
    id: generateId(),
  };
};
