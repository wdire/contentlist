import {Content, Row} from "@/lib/types/list.type";
import {listApi} from "@/services/listApi";
import {UniqueIdentifier} from "@dnd-kit/core";
import {arrayMove} from "@dnd-kit/sortable";
import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";

export type ListState = {
  info: {
    id: number | undefined;
    name: string | undefined;
  };
  contents: Content[];
  rows: Row[];
  activeRow: Row | null;
  activeContent: Content | null;
  fetchLoading: boolean;
  hasUnsavedChanges: boolean;
};

const defaultRows: Row[] = [
  {id: "S", title: "S", color: "red"},
  {id: "A", title: "A", color: "orange"},
  {id: "B", title: "B", color: "light-orange"},
  {id: "C", title: "C", color: "lime-green"},
  {id: "D", title: "D", color: "green"},
];

const initialState: ListState = {
  info: {
    id: undefined,
    name: undefined,
  },
  contents: [],
  rows: [],
  activeContent: null,
  activeRow: null,
  fetchLoading: true,
  hasUnsavedChanges: false,
};

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    initList: (state, action: PayloadAction<Pick<ListState, "rows" | "contents" | "info">>) => {
      state.rows = action.payload.rows;
      state.contents = action.payload.contents;
      state.info = action.payload.info;
    },
    addContent: (state, action: PayloadAction<Content>) => {
      state.contents.push(action.payload);
      state.hasUnsavedChanges = true;
    },
    onSaved: (state) => {
      state.hasUnsavedChanges = false;
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

      if (activeId === overId) return;

      const isActiveARow = activeType === "Row";
      if (!isActiveARow) return;

      console.log("DRAG END");

      const activeRowIndex = state.rows.findIndex((row) => row.id === activeId);

      const overRowIndex = state.rows.findIndex((row) => row.id === overId);

      state.rows = arrayMove(state.rows, activeRowIndex, overRowIndex);
      state.hasUnsavedChanges = true;
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
      console.log("dispatch onDragMove run");

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
          console.log("HEEYYY", activeIndex, overIndex);
          state.contents = arrayMove(state.contents, activeIndex, overIndex - 1);
        }

        state.contents = arrayMove(state.contents, activeIndex, overIndex);
      }

      // Dropping Content over a Row
      if (isActiveAContent && isOverARow) {
        const activeIndex = state.contents.findIndex((t) => t.id === activeId);

        state.contents[activeIndex].rowId = overId;

        // console.log("activeIndex overId", activeIndex, overId);

        state.hasUnsavedChanges = true;

        state.contents = arrayMove(state.contents, activeIndex, activeIndex);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(listApi.endpoints.get.matchFulfilled, (state) => {
      state.fetchLoading = false;
    });
  },
});

export const listActions = listSlice.actions;

export default listSlice.reducer;
