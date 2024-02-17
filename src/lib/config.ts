import {Row} from "./types/list.type";
import {generateId} from "./utils/helper.utils";

export const defaultNewListInfo: {rows: Row[]} = {
  rows: [
    {
      id: generateId(),
      title: "S",
      color: "red",
    },
    {
      id: generateId(),
      title: "A",
      color: "orange",
    },
    {
      id: generateId(),
      title: "B",
      color: "light-orange",
    },
    {
      id: generateId(),
      title: "C",
      color: "yellow",
    },
    {
      id: generateId(),
      title: "D",
      color: "lime-green",
    },
  ],
};
