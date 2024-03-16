import {
  convertDBContentsDataToRedux,
  convertReduxListForDBUpdate,
} from "@/lib/utils/convertList.utils";
import {isListFirst12ContentsChanged} from "@/lib/utils/helper.utils";
import {listThumbnailGenerate} from "@/lib/utils/imageCreate.utils";
import {useUpdateMutation} from "@/services/listApi";

import {useAppDispatch, useAppSelector} from "@/store";
import {listActions} from "@/store/features/list/listSlice";
import {Button} from "@nextui-org/react";
import React, {useMemo} from "react";

const ListSaveButton = () => {
  const list = useAppSelector((state) => state.list);
  const hasUnsavedChanges = useAppSelector((state) => state.list.hasUnsavedChanges);

  const dispatch = useAppDispatch();

  const [trigger, {isLoading, error}] = useUpdateMutation();

  const handleSaveClick = async () => {
    try {
      const createdList = convertReduxListForDBUpdate(list);

      let listImagefile: File | null = null;

      if (
        isListFirst12ContentsChanged(list.startContents, list.contents) &&
        list.contents.length >= 3
      ) {
        listImagefile = await listThumbnailGenerate();
        console.log("Create thumbnail");
      }

      // Delete image if list's content count is less than 3
      const deleteImage = list.contents.length < 3;

      if (deleteImage) {
        console.log("Delete thumbnail");
      }

      const saveResponse = await trigger({
        formdata: {
          body: createdList.formdata.body,
          image: listImagefile,
          deleteImage,
        },
        params: createdList.params,
      }).unwrap();

      if (saveResponse.data) {
        const rowsContents = convertDBContentsDataToRedux({
          contentsData: saveResponse.data.contentsData,
        });

        dispatch(
          listActions.updateList({
            rows: rowsContents.rows,
            contents: rowsContents.contents,
            startContents: rowsContents.contents,
          }),
        );
      }
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
        variant="flat"
      >
        {buttonText}
      </Button>
      {error ? <div className="text-red-500 mt-5">Error occured while saving</div> : null}
    </>
  );
};

export default ListSaveButton;
