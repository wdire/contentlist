import {createListFromDnd} from "@/lib/utils/createList.utils";
import {useUpdateMutation} from "@/services/listApi";

import {useAppSelector} from "@/store";
import {Button} from "@nextui-org/react";
import React, {useMemo} from "react";

const ListSaveButton = () => {
  const list = useAppSelector((state) => state.list);
  const hasUnsavedChanges = useAppSelector((state) => state.list.hasUnsavedChanges);

  const [trigger, {isLoading, error}] = useUpdateMutation();

  const handleSaveClick = async () => {
    try {
      await trigger(createListFromDnd(list));
    } catch (err) {
      console.error(err);
    }
  };

  const buttonText = useMemo(() => {
    if (hasUnsavedChanges) {
      if (isLoading) {
        return "Saving";
      }

      return "Save";
    }
    return "Saved";
  }, [hasUnsavedChanges, isLoading]);

  return (
    <>
      <Button
        color="success"
        isDisabled={!hasUnsavedChanges}
        isLoading={isLoading}
        onPress={handleSaveClick}
        className="mt-5"
      >
        {buttonText}
      </Button>
      {error ? <div className="text-red-500 mt-5">Error occured while saving</div> : null}
    </>
  );
};

export default ListSaveButton;
