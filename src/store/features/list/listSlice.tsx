import {STORAGE_ROW_ID, TRASH_BOX_ID} from "@/lib/constants";
import {Content, Row} from "@/lib/types/list.type";
import {orderContentsByRows} from "@/lib/utils/helper.utils";
import {UniqueIdentifier} from "@dnd-kit/core";
import {arrayMove} from "@dnd-kit/sortable";
import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import {
  deleteRememberedState,
  getRememberedStates,
  rememberUnsavedChanges,
  setRememberedState,
} from "@/lib/utils/rememberStates.utils";
import {toast} from "react-toastify";
import {InitListProps, ListState, ListUpdateProps} from "./listSlice.type";

const initialState: ListState = {
  info: {
    id: undefined,
    name: undefined,
    isListOwner: undefined,
    owner: undefined,
    cloudinaryImage: undefined,
    imageContents: undefined,
  },
  contents: [],
  rows: [],
  activeContent: null,
  activeRow: null,
  fetchLoading: true,
  hasUnsavedChanges: false,
  showName: false,
  showSources: false,
  redirectSourcePage: false,
  contentSize: "1x",
  startData: {
    name: undefined,
    imageContents: undefined,
    contents: [],
    rows: [],
  },
  isLocalMode: false,
  nowAddedNewItem: false,
};

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    initList: (state, action: PayloadAction<InitListProps>) => {
      state.rows = action.payload.rows;
      state.contents = action.payload.contents;

      state.startData = action.payload.startData;
      state.info = action.payload.info;

      state.isLocalMode = action.payload.isLocalMode;

      const {CONTENT_SIZE, SHOW_NAMES, UNSAVED_CHANGES} = getRememberedStates({
        listId: state.info.id,
      });

      if (CONTENT_SIZE) {
        state.contentSize = CONTENT_SIZE;
      }

      if (SHOW_NAMES) {
        state.showName = SHOW_NAMES;
      }

      if (UNSAVED_CHANGES !== undefined) {
        const oneWeek = 7 * 24 * 60 * 60 * 1000;

        if (
          UNSAVED_CHANGES?.last_update &&
          new Date().getTime() - new Date(UNSAVED_CHANGES?.last_update).getTime() >= oneWeek
        ) {
          deleteRememberedState({key: "UNSAVED_CHANGES", listId: action.payload.info.id});
        } else if (
          UNSAVED_CHANGES.hasUnsavedChanges === true &&
          UNSAVED_CHANGES.contents &&
          UNSAVED_CHANGES.rows
        ) {
          state.hasUnsavedChanges = true;
          state.contents = UNSAVED_CHANGES.contents;
          state.rows = UNSAVED_CHANGES.rows;

          toast("Applied unsaved changes to list", {
            type: "info",
            autoClose: 3000,
            toastId: "applied_not_saved",
          });
        }
      } else {
        deleteRememberedState({key: "UNSAVED_CHANGES", listId: action.payload.info.id});
      }

      state.fetchLoading = false;
    },
    updateList: (state, action: PayloadAction<ListUpdateProps>) => {
      state.rows = action.payload.rows;
      state.contents = action.payload.contents;
      state.startData = action.payload.startData;
      state.info.cloudinaryImage = action.payload.info.cloudinaryImage;
      state.info.imageContents = action.payload.info.imageContents;
    },
    resetList: (state) => {
      state.info.name = state.startData.name;
      state.rows = state.startData.rows;
      state.contents = state.startData.contents;
      state.info.imageContents = state.startData.imageContents;
      state.hasUnsavedChanges = false;

      deleteRememberedState({key: "UNSAVED_CHANGES", listId: state.info.id});
    },
    editListInfo: (state, action: PayloadAction<{name: string}>) => {
      state.info.name = action.payload.name;
      state.hasUnsavedChanges = true;
    },
    addContent: (state, action: PayloadAction<Content>) => {
      state.contents.push(action.payload);
      state.hasUnsavedChanges = true;

      rememberUnsavedChanges({
        contents: state.contents,
        rows: state.rows,
        listId: state.info.id,
      });
    },
    addRow: (state, action: PayloadAction<Row>) => {
      if (state.rows.length < 10) {
        state.rows.push(action.payload);
        state.hasUnsavedChanges = true;

        rememberUnsavedChanges({
          contents: state.contents,
          rows: state.rows,
          listId: state.info.id,
        });
      }
    },
    editRowInfo: (state, action: PayloadAction<Row>) => {
      const rowIndex = state.rows.findIndex((r) => r.id === action.payload.id);

      state.rows[rowIndex].color = action.payload.color;
      state.rows[rowIndex].title = action.payload.title;

      state.hasUnsavedChanges = true;

      rememberUnsavedChanges({
        contents: state.contents,
        rows: state.rows,
        listId: state.info.id,
      });
    },
    deleteRow: (state, action: PayloadAction<Row>) => {
      state.contents = state.contents.map((c) => {
        if (c.rowId === action.payload.id) {
          return {
            ...c,
            rowId: STORAGE_ROW_ID,
          };
        }

        return c;
      });
      state.rows = state.rows.filter((r) => r.id !== action.payload.id);
      state.hasUnsavedChanges = true;

      rememberUnsavedChanges({
        contents: state.contents,
        rows: state.rows,
        listId: state.info.id,
      });
    },
    setShowName: (state, action: PayloadAction<boolean>) => {
      state.showName = action.payload;
      setRememberedState({key: "SHOW_NAMES", value: action.payload});
    },
    setShowSources: (state, action: PayloadAction<boolean>) => {
      state.showSources = action.payload;
    },
    setRedirectSourcePage: (state, action: PayloadAction<boolean>) => {
      state.redirectSourcePage = action.payload;
    },
    setContentSize: (state, action: PayloadAction<ListState["contentSize"]>) => {
      state.contentSize = action.payload;
      setRememberedState({key: "CONTENT_SIZE", value: action.payload});
    },
    setHasUnsavedChanges: (state, action: PayloadAction<boolean>) => {
      if (action.payload === false) {
        deleteRememberedState({key: "UNSAVED_CHANGES", listId: state.info.id});
      }
      state.hasUnsavedChanges = action.payload;
    },
    setImageContents: (state, action: PayloadAction<string>) => {
      state.info.imageContents = action.payload;
    },
    moveRowUpDown: (state, action: PayloadAction<{rowId: string | number; dir: "up" | "down"}>) => {
      const rowIndex = state.rows.findIndex((row) => row.id === action.payload.rowId);
      if (action.payload.dir === "down") {
        if (rowIndex + 1 < state.rows.length) {
          state.rows = arrayMove(state.rows, rowIndex, rowIndex + 1);
        }
      } else if (action.payload.dir === "up") {
        if (rowIndex - 1 >= 0) {
          state.rows = arrayMove(state.rows, rowIndex, rowIndex - 1);
        }
      }

      state.hasUnsavedChanges = true;

      rememberUnsavedChanges({
        contents: state.contents,
        rows: state.rows,
        listId: state.info.id,
      });
    },
    setNowAddedNewItem: (state, action: PayloadAction<boolean>) => {
      state.nowAddedNewItem = action.payload;
    },
    onDragStart: (
      state,
      action: PayloadAction<{
        activeType: string;
        activeRow: Row;
        activeContent: Content;
      }>,
    ) => {
      if (action.payload.activeType === "Row") {
        state.activeRow = action.payload.activeRow;
      } else if (action.payload.activeType === "Content") {
        state.activeContent = action.payload.activeContent;
      }
    },

    onDragEnd: (
      state,
      action: PayloadAction<{
        activeType: string;
        activeId: UniqueIdentifier;
        overType: string;
        overId: UniqueIdentifier | undefined;
      }>,
    ) => {
      state.activeRow = null;
      state.activeContent = null;

      const {activeType, activeId, overId, overType} = action.payload;
      if (!overId) return;

      if (activeType === "Content") {
        if (overType === "Content") {
          const activeIndex = state.contents.findIndex((t) => t.id === activeId);
          const overIndex = state.contents.findIndex((t) => t.id === overId);
          if (activeIndex !== -1 && overIndex !== -1) {
            state.contents.splice(
              overIndex < 0 ? state.contents.length + overIndex : overIndex,
              0,
              state.contents.splice(activeIndex, 1)[0],
            );
          }
        }

        state.contents = orderContentsByRows(state.contents, state.rows);

        rememberUnsavedChanges({
          contents: state.contents,
          rows: state.rows,
          listId: state.info.id,
        });
      }

      if (activeId === overId) return;

      if (overId === TRASH_BOX_ID) {
        state.contents = state.contents.filter((c) => c.id !== activeId);
        rememberUnsavedChanges({
          contents: state.contents,
          rows: state.rows,
          listId: state.info.id,
        });
      }

      if (activeType !== "Row") return;

      const activeRowIndex = state.rows.findIndex((row) => row.id === activeId);

      const overRowIndex = state.rows.findIndex((row) => row.id === overId);

      state.rows = arrayMove(state.rows, activeRowIndex, overRowIndex);
      state.hasUnsavedChanges = true;

      state.contents = orderContentsByRows(state.contents, state.rows);

      rememberUnsavedChanges({
        contents: state.contents,
        rows: state.rows,
        listId: state.info.id,
      });
    },

    onDragMove: (
      state,
      action: PayloadAction<{
        activeType: string;
        activeId: UniqueIdentifier;
        overId: UniqueIdentifier | undefined;
        overType: string;
      }>,
    ) => {
      const {activeId, activeType, overId, overType} = action.payload;
      if (!overId) return;

      if (activeId === overId) return;

      const isActiveAContent = activeType === "Content";
      const isOverAContent = overType === "Content";

      console.log(
        `activeId:${activeId}, activeType:${activeType}, overId:${overId}, overType:${overType}, isActiveAContent:${isActiveAContent}, isOverAContent:${isOverAContent}`,
      );

      if (!isActiveAContent) return;

      const isOverARow = overType === "Row";

      if (isActiveAContent && isOverAContent) {
        const activeIndex = state.contents.findIndex((t) => t.id === activeId);
        const overIndex = state.contents.findIndex((t) => t.id === overId);

        if (state.contents[activeIndex].rowId !== state.contents[overIndex].rowId) {
          state.hasUnsavedChanges = true;
          state.contents[activeIndex].rowId = state.contents[overIndex].rowId;
        }
      }

      if (isActiveAContent && isOverARow) {
        const activeIndex = state.contents.findIndex((t) => t.id === activeId);
        state.hasUnsavedChanges = true;
        state.contents[activeIndex].rowId = overId;
      }
    },
  },
});

export const listActions = listSlice.actions;

export default listSlice.reducer;
