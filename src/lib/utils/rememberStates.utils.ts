import {ListState} from "@/store/features/list/listSlice.type";
import {REMEMBERED_STATES_KEYS, REMEMBERED_STATES_TYPES} from "../constants";

export const getRememberedStates = (): {
  contentSize: ListState["contentSize"] | undefined;
  showName: ListState["showName"] | undefined;
} => {
  let contentSize: ListState["contentSize"] | undefined =
    (localStorage.getItem(REMEMBERED_STATES_KEYS.CONTENT_SIZE) as ListState["contentSize"]) ||
    "1px";

  if (!["1x", "2x", "3x"].includes(contentSize)) {
    contentSize = undefined;
  }

  const showName: ListState["showName"] | undefined =
    localStorage.getItem(REMEMBERED_STATES_KEYS.SHOW_NAMES) === "true" || undefined;

  return {
    contentSize,
    showName,
  };
};

export const setRememberedState = <K extends keyof typeof REMEMBERED_STATES_KEYS>(
  key: keyof typeof REMEMBERED_STATES_KEYS,
  value: REMEMBERED_STATES_TYPES[K],
) => {
  localStorage.setItem(REMEMBERED_STATES_KEYS[key], `${value}`);
};
