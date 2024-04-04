import {useAppDispatch, useAppSelector} from "@/store";
import {searchActions} from "@/store/features/search/searchSlice";
import {Input} from "@nextui-org/react";
import debounce from "lodash.debounce";
import {useEffect, useMemo, useState} from "react";

const SearchTextCreate = () => {
  const dispatch = useAppDispatch();

  const searchSource = useAppSelector((state) => state.search.searchSource);
  const nowAddedNewItem = useAppSelector((state) => state.list.nowAddedNewItem);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (nowAddedNewItem) {
      setInputValue("");
    }
  }, [nowAddedNewItem]);

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
    setInputValue(value);
    debounceSetSelectedResult(value.trim());
  };

  return (
    <div>
      <Input
        size="sm"
        maxLength={65}
        value={inputValue}
        onValueChange={onContentNameInputChange}
        placeholder="Write Content Name"
      />
    </div>
  );
};

export default SearchTextCreate;
