import {searchActions} from "@/store/features/search/searchSlice";
import {useAppDispatch, useAppSelector} from "@/store";
import {Input} from "@nextui-org/react";
import debounce from "lodash.debounce";
import {SearchIcon} from "lucide-react";
import {useEffect, useMemo} from "react";
import {tmdbApi} from "@/services/tmdbApi";
import {anilistApi} from "@/services/anilistApi";
import {
  getContentInfoFromAnilistCharacter,
  getContentInfoFromAnilistMedia,
  getContentInfoFromTmdb,
} from "@/lib/utils/helper.utils";
import {MediaSort, MediaType} from "@/services/anilistApi/anilist.generated";

const SearchInput = () => {
  const dispatch = useAppDispatch();

  const searchQuery = useAppSelector((state) => state.search.searchQuery);
  const searchSource = useAppSelector((state) => state.search.searchSource);

  const debouncedApiCall = useMemo(
    () =>
      debounce(async (query: string) => {
        console.log("run debounce", query);

        dispatch(searchActions.setLoading(true));

        if (searchSource === "tmdb") {
          const result = await dispatch(
            tmdbApi.endpoints.searchMulti.initiate({
              query,
            }),
          ).unwrap();

          dispatch(
            searchActions.setSearchResults(
              getContentInfoFromTmdb({data: result.data?.results || []}),
            ),
          );
        } else if (searchSource === "anilist_anime" || searchSource === "anilist_manga") {
          const result = await dispatch(
            anilistApi.endpoints.GetMediaList.initiate({
              search: query,
              sort: MediaSort.SearchMatch,
              type: searchSource === "anilist_anime" ? MediaType.Anime : MediaType.Manga,
            }),
          ).unwrap();

          dispatch(searchActions.setSearchResults(getContentInfoFromAnilistMedia({data: result})));
        } else if (searchSource === "anilist_character") {
          const result = await dispatch(
            anilistApi.endpoints.GetCharacterList.initiate({
              search: query,
            }),
          ).unwrap();

          dispatch(
            searchActions.setSearchResults(getContentInfoFromAnilistCharacter({data: result})),
          );
        }

        dispatch(searchActions.setLoading(false));
      }, 400),
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

  return (
    <Input
      classNames={{
        base: "w-full lg:max-w-xs",
        input: "ml-1",
        inputWrapper: "h-[48px]",
      }}
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
