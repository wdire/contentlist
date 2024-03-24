import {ResponseBodyType} from "@/api/lib/response.api";
import {MAX_LENGTHS} from "@/lib/constants";
import {convertReduxListForDBUpdate} from "@/lib/utils/convertList.utils";
import {listThumbnailGenerate} from "@/lib/utils/imageCreate.utils";
import {deleteRememberedState} from "@/lib/utils/rememberStates.utils";
import {useCreateMutation} from "@/services/listApi";
import {AppStore} from "@/store/store";
import {Button} from "@nextui-org/react";
import {useRouter} from "next/navigation";
import React from "react";
import {useStore} from "react-redux";
import {toast} from "react-toastify";
import {ZodError} from "zod";

const ListCopyButton = () => {
  const [trigger, {isLoading}] = useCreateMutation();

  const store = useStore() as AppStore;
  const router = useRouter();

  const handleCopyListClick = async () => {
    const {list} = store.getState();
    try {
      if (!list.info.id) {
        console.error("Copy list error, no list id");
        return;
      }

      const {
        formdata: {body},
      } = convertReduxListForDBUpdate(list);

      const listImagefile: File | null = await listThumbnailGenerate();
      if (body) {
        const response = await trigger({
          contentsData: {
            rows: body.rows,
            storage: body.storage,
          },
          copyListId: list.info.id,
          image: listImagefile,
          imageContents: listImagefile ? list.generatedThumbnailImageContents : undefined,
        }).unwrap();

        if (response.data?.type === "copy_limit_exceeded") {
          toast(
            `You have reached the limit of ${MAX_LENGTHS.user_list_max_copy} copies for the same list.`,
            {
              type: "warning",
              autoClose: 10000,
            },
          );
        }

        if (response.data?.redirectListId) {
          deleteRememberedState({key: "UNSAVED_CHANGES", listId: list.info.id});
          router.push(`/list/${response.data.redirectListId}`);
        } else {
          throw new Error("Couldn't get response data id");
        }
      } else {
        toast("Body not returned", {
          type: "error",
        });
      }
    } catch (err) {
      toast(
        <>
          <div>{"Couldn't create copy of this list. Message:"}</div>
          {(err as ResponseBodyType<{error: ZodError["issues"]}>)?.data?.error?.[0]?.message}
        </>,
        {
          type: "error",
          toastId: "couldnt_create_copy",
          autoClose: 10000,
        },
      );
      console.log(err);
    }
  };

  return (
    <>
      <Button color="warning" variant="flat" isLoading={isLoading} onPress={handleCopyListClick}>
        Save Copy to Your Lists
      </Button>
    </>
  );
};

export default ListCopyButton;
