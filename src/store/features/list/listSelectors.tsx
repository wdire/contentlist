import {RootState} from "@/store";

const selectFetchLoading = (state: RootState) => state.list.fetchLoading;

const listSelectors = {selectFetchLoading};

export default listSelectors;
