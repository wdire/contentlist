import {Content} from "@/lib/types/list.type";
import {RootState} from "@/store";
import {createSelector} from "@reduxjs/toolkit";
import {Selector, shallowEqual} from "react-redux";

const selectFetchLoading = (state: RootState) => state.list.fetchLoading;

export const makeSelectContentsByRowId = (id: string | number): Selector<RootState, Content[]> => {
  return createSelector(
    [(state: RootState) => state.list.contents],
    (contents) => {
      return contents.filter((content) => content.rowId === id);
    },
    {
      memoizeOptions: {
        resultEqualityCheck: shallowEqual,
      },
    },
  );
};

export const makeFindContentById = (
  id: string | number | null,
): Selector<RootState, Content | undefined> => {
  return createSelector(
    [(state: RootState) => state.list.contents],
    (contents) => {
      return id ? contents.find((content) => content.id === id) : undefined;
    },
    {
      memoizeOptions: {
        resultEqualityCheck: shallowEqual,
      },
    },
  );
};

const listSelectors = {selectFetchLoading};

export default listSelectors;
