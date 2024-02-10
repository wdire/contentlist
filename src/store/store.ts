import {configureStore} from "@reduxjs/toolkit";
import searchReducer from "@/store/features/search/searchSlice";
import listReducer from "@/store/features/list/listSlice";
import {listApi} from "@/services/listApi";
import {tmdbApi} from "@/services/tmdbApi";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [tmdbApi.reducerPath]: tmdbApi.reducer,
      [listApi.reducerPath]: listApi.reducer,
      search: searchReducer,
      list: listReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(listApi.middleware, tmdbApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
