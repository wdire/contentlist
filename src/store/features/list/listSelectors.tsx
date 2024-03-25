import {RootState} from "@/store";
import {createSelector} from "@reduxjs/toolkit";

const selectFetchLoading = (state: RootState) => state.list.fetchLoading;

export const selectContentsByRowId = createSelector(
  [(state: RootState) => state.list.contents, (_, id: string | number) => id],
  (contents, id) => contents.filter((content) => content.rowId === id),
);

const listSelectors = {selectFetchLoading};

export default listSelectors;
