import {REMEMBERED_STATES_KEYS, REMEMBERED_STATES_TYPES} from "../constants";
import {Content, Row} from "../types/list.type";

export const getRememberedStates = ({
  listId,
}: {
  listId: number | undefined;
}): REMEMBERED_STATES_TYPES => {
  const CONTENT_SIZE: REMEMBERED_STATES_TYPES["CONTENT_SIZE"] | undefined =
    (localStorage.getItem(
      REMEMBERED_STATES_KEYS.CONTENT_SIZE,
    ) as REMEMBERED_STATES_TYPES["CONTENT_SIZE"]) || "1px";

  const SHOW_NAMES: REMEMBERED_STATES_TYPES["SHOW_NAMES"] | undefined =
    localStorage.getItem(REMEMBERED_STATES_KEYS.SHOW_NAMES) === "true" || undefined;

  let UNSAVED_CHANGES: REMEMBERED_STATES_TYPES["UNSAVED_CHANGES"] | undefined;

  if (listId) {
    try {
      UNSAVED_CHANGES =
        JSON.parse(
          localStorage.getItem(`${REMEMBERED_STATES_KEYS.UNSAVED_CHANGES}_list-${listId}`) || "",
        ) || undefined;
    } catch {
      UNSAVED_CHANGES = undefined;
    }
  }

  return {
    CONTENT_SIZE,
    SHOW_NAMES,
    UNSAVED_CHANGES,
  };
};

export const setRememberedState = <K extends keyof typeof REMEMBERED_STATES_KEYS>({
  key,
  value,
  isObject,
  listId,
}: {
  key: keyof typeof REMEMBERED_STATES_KEYS;
  value: REMEMBERED_STATES_TYPES[K];
  isObject?: boolean;
  listId?: number;
}) => {
  localStorage.setItem(
    `${REMEMBERED_STATES_KEYS[key]}${listId ? `_list-${listId}` : ""}`,
    isObject ? JSON.stringify(value) : `${value}`,
  );
};

export const deleteRememberedState = ({
  key,
  listId,
}: {
  key: keyof typeof REMEMBERED_STATES_KEYS;
  listId?: number;
}) => {
  localStorage.removeItem(`${REMEMBERED_STATES_KEYS[key]}${listId ? `_list-${listId}` : ""}`);
};

export const rememberUnsavedChanges = ({
  listId,
  rows,
  contents,
  hasUnsavedChanges,
}: {
  listId: number | undefined;
  contents: Content[] | undefined;
  rows: Row[] | undefined;
  hasUnsavedChanges?: boolean;
}) => {
  if (!listId) return;

  setRememberedState({
    key: "UNSAVED_CHANGES",
    value: {
      last_update: new Date(),
      hasUnsavedChanges: hasUnsavedChanges || true,
      contents,
      rows,
    },
    isObject: true,
    listId,
  });
};
