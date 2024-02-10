import {createNewRow} from "@/lib/utils";
import {useAppDispatch, useAppSelector} from "@/store";
import {listActions} from "@/store/features/list/listSlice";
import {Button} from "@nextui-org/react";
import React from "react";

const ListActions = () => {
  const dispatch = useAppDispatch();
  const rowsLength = useAppSelector((state) => state.list.rows.length);
  const maxLengthReached = rowsLength >= 10;

  const handleAddRowClick = () => {
    dispatch(listActions.addRow(createNewRow()));
  };

  return (
    <>
      <Button color="primary" isDisabled={maxLengthReached} onClick={handleAddRowClick}>
        {maxLengthReached ? "Max Row Length Reached" : "Add Row"}
      </Button>
    </>
  );
};

export default ListActions;
