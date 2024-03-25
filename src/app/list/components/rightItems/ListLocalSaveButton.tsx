import {LocalModeListType} from "@/lib/types/localMode.type";
import {LocalMode} from "@/lib/utils/localMode.utils";
import {useAppDispatch, useAppSelector} from "@/store";
import {listActions} from "@/store/features/list/listSlice";
import {AppStore} from "@/store/store";
import {Button} from "@nextui-org/react";
import {useRouter} from "next/navigation";
import React, {useEffect, useMemo, useState} from "react";
import {useStore} from "react-redux";

const ListLocalSaveButton = () => {
  const dispatch = useAppDispatch();
  const listId = useAppSelector((state) => state.list.info.id);
  const hasUnsavedChanges = useAppSelector((state) => state.list.hasUnsavedChanges);
  const isLocalMode = useAppSelector((state) => state.list.isLocalMode);
  const store = useStore() as AppStore;

  const [hasLocalSave, setLocalSave] = useState<boolean | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (listId) {
      setLocalSave(Boolean(LocalMode.getList(listId)));
    }
  }, [listId]);

  const handleLocalSaveClick = async () => {
    const {list} = store.getState();
    try {
      if (!hasLocalSave || list.isLocalMode) {
        const saveList: LocalModeListType = {
          rows: list.rows,
          contents: list.contents,
          info: {
            id: list.info.id || -1,
            name: list.info.name || "",
          },
        };

        LocalMode.setList(saveList);
        dispatch(listActions.setHasUnsavedChanges(false));
        console.log("Saved to local list");

        if (!list.isLocalMode) {
          router.push(`/list/${list.info.id}?local=true`);
        }
      }

      if (hasLocalSave) {
        router.push(`/list/${listId}?local=true`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const buttonText = useMemo(() => {
    if (isLocalMode) {
      return `${hasUnsavedChanges ? "Save" : "Saved"} to Local`;
    }

    if (hasLocalSave) {
      return "View Local Save";
    }

    return "Create Local Save";
  }, [isLocalMode, hasUnsavedChanges, hasLocalSave]);

  return (
    <>
      <Button
        color="secondary"
        isDisabled={isLocalMode && !hasUnsavedChanges}
        onPress={handleLocalSaveClick}
        variant="flat"
      >
        {buttonText}
      </Button>
    </>
  );
};

export default ListLocalSaveButton;
