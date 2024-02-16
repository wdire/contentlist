import {InitListProps, ListState} from "@/store/features/list/listSlice";
import {ApiRequestTypes} from "@/api/lib/schemas/index.schema";
import {ZodTypeOf} from "@/api/lib/index.type.api";
import {ListRequestTypes, ListSchemas} from "@/api/lib/schemas/list.schema";
import {UserResource} from "@clerk/types";
import {Content, Row} from "./types/list.type";
import {STORAGE_ROW_ID, rowColors} from "./constants";

export const generateId = () => {
  /* Generate a random number between 0 and 10000 */
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const randColor = () => {
  return rowColors[Math.floor(Math.random() * rowColors.length)];
};

export const createNewRow = (): Row => {
  return {
    color: "yellow",
    title: "NEW",
    id: generateId(),
  };
};

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
      isListOwner: currentUser ? currentUser.id === user?.id : false,
      owner: {
        id: user?.id || "",
        username: user?.username || "",
      },
      // TODO: Change above after making list having user required in database
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
            data: {
              name: c.name,
              source: "TMDB",
              image_url: c.image_url || "",
            },
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
        data: {
          name: c.name,
          source: "TMDB",
          image_url: c.image_url || "",
        },
      };
    }) || []),
  ];

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
              const newC = {
                name: c.data.name,
                image_url: c.data.image_url,
                source: c.data.source,
                tmdb: c.data?.tmdb
                  ? {
                      tmdb_id: c.data.tmdb?.id,
                      tmdb_media_type: c.data.tmdb.media_type,
                    }
                  : undefined,
              };

              return newC;
            }) || [],
      };
    }),
    storage: list.contents
      .filter((c) => c.rowId === STORAGE_ROW_ID)
      .map((c) => {
        const newC = {
          name: c.data.name,
          image_url: c.data.image_url,
          source: c.data.source,
          tmdb: c.data?.tmdb
            ? {
                tmdb_id: c.data.tmdb?.id,
                tmdb_media_type: c.data.tmdb.media_type,
              }
            : undefined,
        };

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
