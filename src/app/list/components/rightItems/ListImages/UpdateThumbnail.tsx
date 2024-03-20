import {getListCloudinaryImage, getListFirst12ContentsInfo} from "@/lib/utils/helper.utils";
import {listThumbnailGenerate, setGeneratedThumbnailImage} from "@/lib/utils/imageCreate.utils";
import {useAppDispatch, useAppSelector} from "@/store";
import {listActions} from "@/store/features/list/listSlice";
import {AppStore} from "@/store/store";
import {Button, Spinner} from "@nextui-org/react";
import Image from "next/image";
import React, {useEffect, useMemo, useState} from "react";
import {useStore} from "react-redux";
import {toast} from "react-toastify";

const UpdateThumbnail = () => {
  const hasUnsavedChanges = useAppSelector((state) => state.list.hasUnsavedChanges);
  const cloudinaryImage = useAppSelector((state) => state.list.info.cloudinaryImage);

  const dispatch = useAppDispatch();
  const store = useStore() as AppStore;

  const [updateImageState, setUpdateImageState] = useState<
    "default" | "creating_image" | "created_image"
  >("default");

  const [thumbnailPreviewUrl, setThumbnailPreviewBlobUrl] = useState(
    getListCloudinaryImage({
      publicId: cloudinaryImage?.publicId,
      version: cloudinaryImage?.version,
    }),
  );

  const [message, setMessage] = useState("");

  useEffect(() => {
    setUpdateImageState("default");
  }, [hasUnsavedChanges]);

  const handleCreateThumbnailClick = async () => {
    const {
      contents,
      info: {imageContents},
    } = store.getState().list;

    setMessage("");

    const newImageContents = getListFirst12ContentsInfo(contents);

    if (typeof newImageContents === "object") {
      toast(
        <>
          Content source id not found for &apos;{newImageContents.data.name}&apos;. <br />
          Please re-add that content or reach out if problem continues
        </>,
        {
          type: "error",
          autoClose: 10000,
        },
      );
      return;
    }

    if (imageContents === newImageContents) {
      setThumbnailPreviewBlobUrl(
        getListCloudinaryImage({
          publicId: cloudinaryImage?.publicId,
          version: cloudinaryImage?.version,
        }),
      );
      setUpdateImageState("default");
      setGeneratedThumbnailImage(null);
      setMessage("Same as the currently saved");

      return;
    }

    dispatch(listActions.setGeneratedThumbnailImageContents(newImageContents));

    if (contents.length >= 3) {
      setUpdateImageState("creating_image");
      const listImageFile = await listThumbnailGenerate();
      setUpdateImageState("created_image");

      if (listImageFile) {
        setThumbnailPreviewBlobUrl(URL.createObjectURL(listImageFile));
        dispatch(listActions.setHasUnsavedChanges(true));
      }
    } else {
      setThumbnailPreviewBlobUrl("/assets/no-image.png");
    }
  };

  const buttonText = useMemo(() => {
    if (updateImageState === "creating_image") {
      return "Creating";
    }

    return "Create";
  }, [updateImageState]);

  return (
    <div className="flex flex-col gap-3">
      <div>
        {updateImageState === "creating_image" ? (
          <div className="h-40 w-40 flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <Image
            src={thumbnailPreviewUrl}
            width={160}
            height={160}
            alt="List Thumbnail"
            unoptimized
          />
        )}
      </div>
      <div className="flex gap-3 lg:gap-0 lg:justify-between items-center">
        <Button
          color="warning"
          isDisabled={updateImageState === "creating_image"}
          onPress={handleCreateThumbnailClick}
          variant="flat"
          className="w-min"
        >
          {buttonText}
        </Button>
        {updateImageState === "created_image" || message ? (
          <div className="text-xs w-24">{message || "Save to update the Thumbnail"}</div>
        ) : null}
      </div>
    </div>
  );
};

export default UpdateThumbnail;
