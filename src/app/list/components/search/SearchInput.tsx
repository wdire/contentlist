import {searchActions} from "@/store/features/search/searchSlice";
import {useAppDispatch, useAppSelector} from "@/store";
import {Input} from "@nextui-org/react";
import debounce from "lodash.debounce";
import {SearchIcon} from "lucide-react";
import {useEffect, useMemo} from "react";
import {tmdbSearchMultiInitiate} from "@/services/tmdbApi";
import {AnilistGetCharacterListInitiate, AnilistGetMediaListInitiate} from "@/services/anilistApi";
import {MediaSort, MediaType} from "@/services/anilistApi/anilist.generated";
import {igdbSearchGamesInitiate} from "@/services/igdbApi";
import {
  getContentInfoFromTmdb,
  getContentInfoFromAnilistCharacter,
  getContentInfoFromAnilistMedia,
  getContentInfoFromIgdbGame,
  getContentInfoFromWikipedia,
} from "@/lib/utils/search.utils";
import {wikipediaSearchInitiate} from "@/services/wikipediaApi";
import {getExistingSearchResultIndexes} from "@/lib/utils/helper.utils";
import {useStore} from "react-redux";
import {AppStore} from "@/store/store";

const SearchInput = () => {
  const dispatch = useAppDispatch();

  const searchQuery = useAppSelector((state) => state.search.searchQuery);
  const searchSource = useAppSelector((state) => state.search.searchSource);

  const store = useStore() as AppStore;

  const debouncedApiCall = useMemo(
    () =>
      debounce(async (query: string) => {
        console.log("run debounce", query);

        dispatch(searchActions.setLoading(true));

        let searchResults: PrismaJson.ContentType[] = [];

        if (searchSource === "tmdb") {
          const result = await dispatch(
            tmdbSearchMultiInitiate({
              query,
            }),
          ).unwrap();

          searchResults = getContentInfoFromTmdb({data: result.data?.results || []});
        } else if (searchSource === "anilist_anime" || searchSource === "anilist_manga") {
          const result = await dispatch(
            AnilistGetMediaListInitiate({
              search: query,
              sort: MediaSort.SearchMatch,
              type: searchSource === "anilist_anime" ? MediaType.Anime : MediaType.Manga,
            }),
          ).unwrap();

          searchResults = getContentInfoFromAnilistMedia({data: result});
        } else if (searchSource === "anilist_character") {
          const result = await dispatch(
            AnilistGetCharacterListInitiate({
              search: query,
            }),
          ).unwrap();

          searchResults = getContentInfoFromAnilistCharacter({data: result});
        } else if (searchSource === "igdb") {
          const result = await dispatch(
            igdbSearchGamesInitiate({
              query,
            }),
          ).unwrap();

          searchResults = getContentInfoFromIgdbGame({data: result.data || []});
        } else if (searchSource === "wikipedia") {
          const result = await dispatch(
            wikipediaSearchInitiate({
              query,
            }),
          ).unwrap();

          searchResults = getContentInfoFromWikipedia({data: result.query.pages || []});
        } else {
          console.error("Unkown search source, how did you do that?");
        }

        if (searchResults.length > 0) {
          const {
            list: {contents},
          } = store.getState();

          dispatch(searchActions.setSearchResults(searchResults));

          dispatch(
            searchActions.setResultsExistingContentIndexes(
              getExistingSearchResultIndexes({contents, findContents: searchResults}),
            ),
          );
        }

        dispatch(searchActions.setLoading(false));
      }, 400),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchSource, dispatch],
  );

  useEffect(() => {
    if (searchQuery) {
      debouncedApiCall(searchQuery);
    }
  }, [searchQuery, debouncedApiCall]);

  const setSearchQuery = (query: string) => {
    dispatch(searchActions.setSearchQuery(query));
  };

  const setSearchInputFocus = (focus: boolean) => {
    dispatch(searchActions.setShowResults(focus));
  };

  return (
    <Input
      classNames={{
        base: "w-full lg:max-w-xs",
        input: "ml-1",
        inputWrapper: "h-[48px]",
      }}
      onFocus={() => setSearchInputFocus(true)}
      aria-label="Search Content"
      placeholder="Search Content"
      startContent={<SearchIcon className="text-default-400" strokeWidth={2.5} size={20} />}
      isClearable
      onClear={() => setSearchQuery("")}
      value={searchQuery}
      onValueChange={setSearchQuery}
    />
  );
};

export default SearchInput;
