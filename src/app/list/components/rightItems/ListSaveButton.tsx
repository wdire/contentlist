import {ResponseBodyType} from "@/api/lib/response.api";
import {
  convertDBContentsDataToRedux,
  convertReduxListForDBUpdate,
} from "@/lib/utils/convertList.utils";
import {getGeneratedThumbnailImage} from "@/lib/utils/imageCreate.utils";
import {useUpdateMutation} from "@/services/listApi";

import {useAppDispatch, useAppSelector} from "@/store";
import {listActions} from "@/store/features/list/listSlice";
import {AppStore} from "@/store/store";
import {Button} from "@nextui-org/react";
import React, {useEffect, useMemo, useState} from "react";
import {useStore} from "react-redux";
import {toast} from "react-toastify";
import {ZodError} from "zod";

const ListSaveButton = () => {
  const store = useStore() as AppStore;

  const hasUnsavedChanges = useAppSelector((state) => state.list.hasUnsavedChanges);
  const generatedThumbnailImageContents = useAppSelector(
    (state) => state.list.generatedThumbnailImageContents,
  );

  const dispatch = useAppDispatch();

  const [trigger, {isLoading}] = useUpdateMutation();

  const [savingState, setSavingState] = useState<
    "not_saved" | "saved" | "saving" | "saving_and_updating_image"
  >("saved");

  useEffect(() => {
    setSavingState("not_saved");
  }, [generatedThumbnailImageContents]);

  const handleSaveClick = async () => {
    try {
      const {list} = store.getState();
      const createdList = convertReduxListForDBUpdate(list);

      const listImagefile = getGeneratedThumbnailImage();

      // Delete image if list's content count is less than 3
      const deleteImage =
        !!list.info.cloudinaryImage && listImagefile === null && list.contents.length < 3;

      if (deleteImage) {
        console.log("Delete thumbnail");
      }
      setSavingState(listImagefile || deleteImage ? "saving_and_updating_image" : "saving");

      const saveResponse = await trigger({
        formdata: {
          body: createdList.formdata.body,
          image: listImagefile,
          deleteImage,
          imageContents: listImagefile ? list.generatedThumbnailImageContents : undefined,
        },
        params: createdList.params,
      }).unwrap();

      if (saveResponse.data && "contentsData" in saveResponse.data) {
        const rowsContents = convertDBContentsDataToRedux({
          contentsData: saveResponse.data.contentsData,
        });

        dispatch(
          listActions.updateList({
            rows: rowsContents.rows,
            contents: rowsContents.contents,
            startContents: rowsContents.contents,
            startRows: rowsContents.rows,
            info: {
              cloudinaryImage: saveResponse.data.cloudinaryImage,
              imageContents: saveResponse.data.imageContents,
            },
          }),
        );

        dispatch(listActions.setHasUnsavedChanges(false));
      }
      setSavingState("saved");
    } catch (err: unknown) {
      toast(
        <>
          <div>{"Couldn't update list. Message:"}</div>
          {(err as ResponseBodyType<{error: ZodError["issues"]}>)?.data?.error?.[0]?.message}
        </>,
        {
          type: "error",
          toastId: "couldnt_update_list",
          autoClose: 10000,
        },
      );
      setSavingState("saved");
      console.error(err);
    }
  };

  const buttonText = useMemo(() => {
    if (hasUnsavedChanges) {
      if (savingState === "saving_and_updating_image") {
        return "Saving/Uploading Image";
      }

      if (isLoading) {
        return "Saving";
      }

      return "Save";
    }
    return "Saved";
  }, [hasUnsavedChanges, isLoading, savingState]);

  return (
    <>
      <Button
        color="success"
        isDisabled={!hasUnsavedChanges}
        isLoading={isLoading}
        onPress={handleSaveClick}
        variant="flat"
      >
        {buttonText}
      </Button>
    </>
  );
};

export default ListSaveButton;
