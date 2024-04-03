import {useAppDispatch, useAppSelector} from "@/store";
import {searchActions} from "@/store/features/search/searchSlice";
import {Input} from "@nextui-org/react";
import debounce from "lodash.debounce";
import {useMemo} from "react";

const SearchTextCreate = () => {
  const dispatch = useAppDispatch();

  const searchSource = useAppSelector((state) => state.search.searchSource);

  const debounceSetSelectedResult = useMemo(
    () =>
      debounce(async (value: string) => {
        if (value.length > 0) {
          dispatch(
            searchActions.setSelectedResult({
              image_url: "",
              name: value,
              source: "text",
            }),
          );
        } else {
          dispatch(searchActions.setSelectedResult(null));
        }
      }, 400),
    [dispatch],
  );

  if (searchSource !== "text") {
    return null;
  }

  const onContentNameInputChange = (value: string) => {
    debounceSetSelectedResult(value.trim());
  };

  return (
    <div>
      <Input
        size="sm"
        maxLength={65}
        onValueChange={onContentNameInputChange}
        placeholder="Write Content Name"
      />
    </div>
  );
};

export default SearchTextCreate;
