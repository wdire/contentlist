import {searchActions} from "@/store/features/search/searchSlice";
import {useAppDispatch, useAppSelector} from "@/store";
import {Input} from "@nextui-org/react";
import debounce from "lodash.debounce";
import {SearchIcon} from "lucide-react";
import {useEffect, useMemo} from "react";
import {ApiRequestTypes} from "@/api/lib/schemas/index.schema";

const SearchInput = ({
  searchTrigger,
}: {
  searchTrigger: (
    params: ApiRequestTypes["/tmdb/search/multi"]["params"],
    preferCache?: boolean | undefined,
  ) => void;
}) => {
  const dispatch = useAppDispatch();

  const searchQuery = useAppSelector((state) => state.search.searchQuery);

  const debouncedApiCall = useMemo(
    () =>
      debounce((query: string) => {
        console.log("run debounce", query);
        searchTrigger({
          query,
        });
      }, 400),
    [searchTrigger],
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
