import {STORAGE_ROW_ID, TRASH_BOX_ID} from "@/lib/constants";
import {Content, Row} from "@/lib/types/list.type";
import {orderContentsByRows} from "@/lib/utils/helper.utils";
import {UniqueIdentifier} from "@dnd-kit/core";
import {arrayMove} from "@dnd-kit/sortable";
import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import {getRememberedStates, setRememberedState} from "@/lib/utils/rememberStates.utils";
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
  contentSize: "1x",
  startContents: [],
  isLocalMode: false,
};

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    initList: (state, action: PayloadAction<InitListProps>) => {
      state.rows = action.payload.rows;
      state.contents = action.payload.contents;
      state.startContents = action.payload.startContents;
      state.info = action.payload.info;
      state.fetchLoading = false;
      state.isLocalMode = action.payload.isLocalMode;

      const {contentSize, showName} = getRememberedStates();

      if (contentSize !== undefined) {
        state.contentSize = contentSize;
      }

      if (showName !== undefined) {
        state.showName = showName;
      }
    },
    updateList: (state, action: PayloadAction<ListUpdateProps>) => {
      state.rows = action.payload.rows;
      state.contents = action.payload.contents;
      state.startContents = action.payload.startContents;
      state.info.cloudinaryImage = action.payload.info.cloudinaryImage;
      state.info.imageContents = action.payload.info.imageContents;
    },
    editListInfo: (state, action: PayloadAction<{name: string}>) => {
      state.info.name = action.payload.name;
      state.hasUnsavedChanges = true;
    },
    addContent: (state, action: PayloadAction<Content>) => {
      state.contents.push(action.payload);
      state.hasUnsavedChanges = true;
    },
    addRow: (state, action: PayloadAction<Row>) => {
      if (state.rows.length < 10) {
        state.rows.push(action.payload);
        state.hasUnsavedChanges = true;
      }
    },
    editRowInfo: (state, action: PayloadAction<Row>) => {
      const rowIndex = state.rows.findIndex((r) => r.id === action.payload.id);

      state.rows[rowIndex].color = action.payload.color;
      state.rows[rowIndex].title = action.payload.title;

      state.hasUnsavedChanges = true;
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
    },
    setShowName: (state, action: PayloadAction<boolean>) => {
      state.showName = action.payload;
      setRememberedState("SHOW_NAMES", action.payload);
    },
    setShowSources: (state, action: PayloadAction<boolean>) => {
      state.showSources = action.payload;
    },
    setContentSize: (state, action: PayloadAction<ListState["contentSize"]>) => {
      state.contentSize = action.payload;
      setRememberedState("CONTENT_SIZE", action.payload);
    },
    setHasUnsavedChanges: (state, action: PayloadAction<boolean>) => {
      state.hasUnsavedChanges = action.payload;
    },
    setGeneratedThumbnailImageContents: (state, action: PayloadAction<string>) => {
      state.generatedThumbnailImageContents = action.payload;
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
        overId: UniqueIdentifier | undefined;
      }>,
    ) => {
      state.activeRow = null;
      state.activeContent = null;

      const {activeType, activeId, overId} = action.payload;
      if (!overId) return;

      if (activeType === "Content") {
        state.contents = orderContentsByRows(state.contents, state.rows);
      }

      if (activeId === overId) return;

      if (overId === TRASH_BOX_ID) {
        state.contents = state.contents.filter((c) => c.id !== activeId);
      }

      if (activeType !== "Row") return;

      const activeRowIndex = state.rows.findIndex((row) => row.id === activeId);

      const overRowIndex = state.rows.findIndex((row) => row.id === overId);

      state.rows = arrayMove(state.rows, activeRowIndex, overRowIndex);
      state.hasUnsavedChanges = true;

      state.contents = orderContentsByRows(state.contents, state.rows);
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

      if (!isActiveAContent) return;

      const isOverARow = overType === "Row";

      if (isActiveAContent && isOverAContent) {
        const activeIndex = state.contents.findIndex((t) => t.id === activeId);
        const overIndex = state.contents.findIndex((t) => t.id === overId);

        state.hasUnsavedChanges = true;

        if (state.contents[activeIndex].rowId !== state.contents[overIndex].rowId) {
          state.contents[activeIndex].rowId = state.contents[overIndex].rowId;
          state.contents = arrayMove(state.contents, activeIndex, overIndex - 1);
        }

        state.contents = arrayMove(state.contents, activeIndex, overIndex);
      }

      // Dropping Content over a Row
      if (isActiveAContent && isOverARow) {
        const activeIndex = state.contents.findIndex((t) => t.id === activeId);

        state.contents[activeIndex].rowId = overId;

        state.hasUnsavedChanges = true;

        state.contents = arrayMove(state.contents, activeIndex, activeIndex);
      }
    },
  },
});

export const listActions = listSlice.actions;

export default listSlice.reducer;
