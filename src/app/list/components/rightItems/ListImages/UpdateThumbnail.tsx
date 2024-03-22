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

  const [updateImageState, setUpdateImageState] = useState<"default" | "creating_image">("default");

  const [thumbnailPreviewUrl, setThumbnailPreviewBlobUrl] = useState(
    getListCloudinaryImage({
      publicId: cloudinaryImage?.publicId,
      version: cloudinaryImage?.version,
    }),
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (hasUnsavedChanges === false) {
      setUpdateImageState("default");
      setThumbnailPreviewBlobUrl(
        getListCloudinaryImage({
          publicId: cloudinaryImage?.publicId,
          version: cloudinaryImage?.version,
        }),
      );
      setMessage("");
    }
  }, [hasUnsavedChanges, cloudinaryImage]);

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

    if (imageContents === newImageContents || (contents.length < 3 && !imageContents)) {
      setThumbnailPreviewBlobUrl(
        getListCloudinaryImage({
          publicId: cloudinaryImage?.publicId,
          version: cloudinaryImage?.version,
        }),
      );
      setUpdateImageState("default");
      setGeneratedThumbnailImage(null);
      setMessage(
        contents.length >= 3
          ? "Same as the currently saved"
          : "Less than three contents has no thumbnail",
      );

      return;
    }

    dispatch(listActions.setGeneratedThumbnailImageContents(newImageContents));

    if (contents.length >= 3) {
      setUpdateImageState("creating_image");
      const listImageFile = await listThumbnailGenerate();
      setUpdateImageState("default");
      setMessage("Save to update the Thumbnail");

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
      <div className="flex gap-3 lg:gap-0 lg:justify-between items-top">
        <Button
          color="warning"
          isDisabled={updateImageState === "creating_image"}
          onPress={handleCreateThumbnailClick}
          variant="flat"
          className="w-min"
        >
          {buttonText}
        </Button>
        {message ? <div className="text-xs w-24 pt-1">{message}</div> : null}
      </div>
    </div>
  );
};

export default UpdateThumbnail;
