import {USER_LIST_MAX_COPY_COUNT} from "@/lib/constants";
import {convertReduxListForDBUpdate} from "@/lib/utils/convertList.utils";
import {listThumbnailGenerate} from "@/lib/utils/imageCreate.utils";
import {useCreateMutation} from "@/services/listApi";
import {useAppSelector} from "@/store";
import {Button} from "@nextui-org/react";

import {useRouter} from "next/navigation";
import React from "react";
import {toast} from "react-toastify";

const ListCopyButton = () => {
  const [trigger, {isLoading}] = useCreateMutation();
  const list = useAppSelector((state) => state.list);
  const router = useRouter();

  const handleCopyListClick = async () => {
    try {
      if (!list.info.id) {
        console.error("Copy list error, no list id");
        return;
      }

      const {
        formdata: {body},
      } = convertReduxListForDBUpdate(list);

      const listImagefile: File | null = await listThumbnailGenerate();

      const response = await trigger({
        contentsData: {
          rows: body.rows,
          storage: body.storage,
        },
        copyListId: list.info.id,
        image: listImagefile,
      }).unwrap();

      if (response.data?.type === "copy_limit_exceeded") {
        toast(
          `You have reached the limit of ${USER_LIST_MAX_COPY_COUNT} copies for the same list.`,
          {
            type: "warning",
            autoClose: 10000,
          },
        );
      }

      if (response.data?.redirectListId) {
        router.push(`/list/${response.data.redirectListId}`);
      } else {
        throw new Error("Couldn't get response data id");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Button
        className="mt-5"
        color="warning"
        variant="flat"
        isLoading={isLoading}
        onPress={handleCopyListClick}
      >
        Save Copy to Your Lists
      </Button>
    </>
  );
};

export default ListCopyButton;
