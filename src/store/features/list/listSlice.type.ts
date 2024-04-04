import {REMEMBERED_STATES_TYPES} from "@/lib/constants";
import {Content, Row} from "@/lib/types/list.type";
import {ListByIdResponse} from "@/services/actions/list.actions";

export type ListState = {
  info: {
    id: number | undefined;
    name: string | undefined;
    cloudinaryImage: ListByIdResponse["cloudinaryImage"] | undefined;
    isListOwner: boolean | undefined;
    owner:
      | {
          id: string;
          username: string;
        }
      | undefined;
    imageContents: string | null | undefined;
  };
  contents: Content[];
  rows: Row[];
  activeRow: Row | null;
  activeContent: Content | null;
  fetchLoading: boolean;
  hasUnsavedChanges: boolean;
  showName: boolean;
  showSources: boolean;
  redirectSourcePage: boolean;
  contentSize: REMEMBERED_STATES_TYPES["CONTENT_SIZE"];
  startData: {
    name: string | undefined;
    contents: Content[];
    rows: Row[];
    imageContents: string | null | undefined;
  };
  isLocalMode: boolean;
  nowAddedNewItem: boolean;
};

export type InitListProps = Pick<
  ListState,
  "rows" | "contents" | "info" | "startData" | "isLocalMode"
> &
  Partial<Pick<ListState, "hasUnsavedChanges" | "contentSize" | "showName">>;
export type ListUpdateProps = Pick<ListState, "rows" | "contents" | "startData"> & {
  info: Pick<ListState["info"], "cloudinaryImage" | "imageContents">;
};
