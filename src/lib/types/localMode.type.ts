import {Content, Row} from "./list.type";

export type LocalModeType = {
  lists: LocalModeListType[];
};

export type LocalModeListType = {
  rows: Row[];
  contents: Content[];
  info: {
    id: number;
    name: string;
  };
};
