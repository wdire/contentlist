import {createNewRow} from "@/lib/utils";
import {useAppDispatch, useAppSelector} from "@/store";
import {listActions} from "@/store/features/list/listSlice";
import {Button, Input} from "@nextui-org/react";
import debounce from "lodash.debounce";
import React from "react";

const ListActions = () => {
  const dispatch = useAppDispatch();
  const rowsLength = useAppSelector((state) => state.list.rows.length);
  const listName = useAppSelector((state) => state.list.info.name);
  const maxLengthReached = rowsLength >= 10;

  const handleAddRowClick = () => {
    dispatch(listActions.addRow(createNewRow()));
  };

  const handleChangeListName = (value: string) => {
    dispatch(listActions.editListInfo({name: value}));
  };

  return (
    <div className="pb-2.5">
      <Input
        label="Name"
        onValueChange={debounce(handleChangeListName, 500)}
        defaultValue={listName}
        maxLength={47}
      />
      <div className="text-base mb-3 mt-4">Actions</div>
      <Button color="primary" isDisabled={maxLengthReached} onClick={handleAddRowClick}>
        {maxLengthReached ? "Max Row Length Reached" : "Add Row"}
      </Button>
    </div>
  );
};

export default ListActions;
