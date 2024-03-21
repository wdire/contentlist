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
  contentSize: REMEMBERED_STATES_TYPES["CONTENT_SIZE"];
  startContents: Content[];
  isLocalMode: boolean;
  generatedThumbnailImageContents?: string;
};

export type InitListProps = Pick<
  ListState,
  "rows" | "contents" | "info" | "startContents" | "isLocalMode"
>;
export type ListUpdateProps = Pick<ListState, "rows" | "contents" | "startContents"> & {
  info: Pick<ListState["info"], "cloudinaryImage" | "imageContents">;
};
