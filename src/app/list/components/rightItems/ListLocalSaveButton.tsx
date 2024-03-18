import {LocalModeListType} from "@/lib/types/localMode.type";
import {LocalMode} from "@/lib/utils/localMode.utils";
import {useAppDispatch, useAppSelector} from "@/store";
import {listActions} from "@/store/features/list/listSlice";
import {Button} from "@nextui-org/react";
import {useRouter} from "next/navigation";
import React, {useEffect, useMemo, useState} from "react";

const ListLocalSaveButton = () => {
  const dispatch = useAppDispatch();
  const list = useAppSelector((state) => state.list);
  const [hasLocalSave, setLocalSave] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    if (list.info.id) {
      setLocalSave(Boolean(LocalMode.getList(list.info.id)));
    }
  }, [list.info.id]);

  const handleLocalSaveClick = async () => {
    try {
      setLoading(true);
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
        setTimeout(() => {
          setLoading(false);
        }, 400);

        if (!list.isLocalMode) {
          router.push(`/list/${list.info.id}?local=true`);
        }
      }

      if (hasLocalSave) {
        router.push(`/list/${list.info.id}?local=true`);
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  const buttonText = useMemo(() => {
    if (list.isLocalMode) {
      return `${list.hasUnsavedChanges ? "Save" : "Saved"} to Local`;
    }

    if (hasLocalSave) {
      return "View Local Save";
    }

    return "Create Local Save";
  }, [list.isLocalMode, list.hasUnsavedChanges, hasLocalSave]);

  return (
    <>
      <Button
        color="secondary"
        isLoading={loading}
        isDisabled={list.isLocalMode && !list.hasUnsavedChanges}
        onPress={handleLocalSaveClick}
        className="mt-5"
        variant="flat"
      >
        {buttonText}
      </Button>
    </>
  );
};

export default ListLocalSaveButton;
