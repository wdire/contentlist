import {configureStore} from "@reduxjs/toolkit";
import searchReducer from "@/store/features/search/searchSlice";
import listReducer from "@/store/features/list/listSlice";
import {listApi} from "@/services/listApi";
import {tmdbApi} from "@/services/tmdbApi";
import {userApi} from "@/services/userApi";
import {anilistApi} from "@/services/anilistApi";
import {igdbApi} from "@/services/igdbApi";
import {wikipediaApi} from "@/services/wikipediaApi";
import {clearbitApi} from "@/services/clearbitApi";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [tmdbApi.reducerPath]: tmdbApi.reducer,
      [listApi.reducerPath]: listApi.reducer,
      [userApi.reducerPath]: userApi.reducer,
      [anilistApi.reducerPath]: anilistApi.reducer,
      [igdbApi.reducerPath]: igdbApi.reducer,
      [wikipediaApi.reducerPath]: wikipediaApi.reducer,
      [clearbitApi.reducerPath]: clearbitApi.reducer,
      search: searchReducer,
      list: listReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        listApi.middleware,
        tmdbApi.middleware,
        userApi.middleware,
        anilistApi.middleware,
        igdbApi.middleware,
        wikipediaApi.middleware,
        clearbitApi.middleware,
      ),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
