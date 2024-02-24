import {configureStore} from "@reduxjs/toolkit";
import searchReducer from "@/store/features/search/searchSlice";
import listReducer from "@/store/features/list/listSlice";
import {listApi} from "@/services/listApi";
import {tmdbApi} from "@/services/tmdbApi";
import {userApi} from "@/services/userApi";
import {anilistApi} from "@/services/anilistApi";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [tmdbApi.reducerPath]: tmdbApi.reducer,
      [listApi.reducerPath]: listApi.reducer,
      [userApi.reducerPath]: userApi.reducer,
      [anilistApi.reducerPath]: anilistApi.reducer,
      search: searchReducer,
      list: listReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        listApi.middleware,
        tmdbApi.middleware,
        userApi.middleware,
        anilistApi.middleware,
      ),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
