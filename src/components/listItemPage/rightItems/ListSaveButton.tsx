import {createListFromDnd} from "@/lib/utils";
import {useUpdateMutation} from "@/services/listApi";

import {useAppDispatch, useAppSelector} from "@/store";
import {listActions} from "@/store/features/list/listSlice";
import {Button} from "@nextui-org/react";
import React from "react";

const ListSaveButton = () => {
  const list = useAppSelector((state) => state.list);
  const hasUnsavedChanges = useAppSelector((state) => state.list.hasUnsavedChanges);

  const dispatch = useAppDispatch();

  const [trigger, {isLoading}] = useUpdateMutation();

  const handleSaveClick = async () => {
    try {
      await trigger(createListFromDnd(list));
      dispatch(listActions.onSaved());
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Button
        color="success"
        isDisabled={!hasUnsavedChanges}
        isLoading={isLoading}
        onClick={handleSaveClick}
        className="mt-5"
      >
        {hasUnsavedChanges ? "Save" : "Saved"}
      </Button>
    </>
  );
};

export default ListSaveButton;
