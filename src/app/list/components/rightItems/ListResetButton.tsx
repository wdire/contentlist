import {useAppDispatch, useAppSelector} from "@/store";
import {listActions} from "@/store/features/list/listSlice";
import {Button} from "@nextui-org/react";

const ListResetButton = () => {
  const dispatch = useAppDispatch();

  const hasUnsavedChanges = useAppSelector((state) => state.list.hasUnsavedChanges);

  const resetButtonClick = () => {
    dispatch(listActions.resetList());
  };

  return (
    <Button
      color="warning"
      isDisabled={!hasUnsavedChanges}
      onPress={resetButtonClick}
      variant="flat"
    >
      Reset Changes
    </Button>
  );
};

export default ListResetButton;
