import {MAX_LENGTHS} from "@/lib/constants";
import {useAppDispatch, useAppSelector} from "@/store";
import {listActions} from "@/store/features/list/listSlice";
import {Input} from "@nextui-org/react";
import debounce from "lodash.debounce";
import React, {useEffect, useMemo, useState} from "react";

const ListNameInput = () => {
  const dispatch = useAppDispatch();

  const listName = useAppSelector((state) => state.list.info.name);
  const [listNameValue, setListNameValue] = useState<string>(listName || "");

  useEffect(() => {
    setListNameValue(listName || "");
  }, [listName]);

  const debounceNameChange = useMemo(
    () =>
      debounce(async (name: string) => {
        dispatch(listActions.editListInfo({name}));
      }, 400),
    [dispatch],
  );
  const handleChangeListName = (value: string) => {
    if (value) {
      setListNameValue(value);
      debounceNameChange(value);
    }
  };

  return (
    <Input
      label="Name"
      onValueChange={handleChangeListName}
      value={listNameValue}
      maxLength={MAX_LENGTHS.list_title}
      className="mb-2"
    />
  );
};

export default ListNameInput;
