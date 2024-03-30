import {useAppDispatch, useAppSelector} from "@/store";
import {listActions} from "@/store/features/list/listSlice";
import {Button, Tooltip} from "@nextui-org/react";
import React from "react";
import {LIST_MAX_ROW_LENGTH} from "@/lib/constants";
import {copyToClipboard, createNewRow} from "@/lib/utils/helper.utils";
import {ExternalLinkIcon, EyeIcon, EyeOffIcon, LinkIcon} from "lucide-react";
import {toast} from "react-toastify";
import {useUser} from "@clerk/nextjs";
import DeleteListButton from "./DeleteListButton";
import ListLocalSaveButton from "../ListLocalSaveButton";
import ListCopyButton from "../ListCopyButton";
import ListResetButton from "../ListResetButton";
import ListNameInput from "./ListNameInput";

const ICON_SIZE = 18;

const ListActions = () => {
  const dispatch = useAppDispatch();

  const fetchLoading = useAppSelector((state) => state.list.fetchLoading);
  const showName = useAppSelector((state) => state.list.showName);
  const showSources = useAppSelector((state) => state.list.showSources);
  const redirectSourcePage = useAppSelector((state) => state.list.redirectSourcePage);
  const rowsLength = useAppSelector((state) => state.list.rows.length);
  const isListOwner = useAppSelector((state) => state.list.info.isListOwner);
  const isLocalMode = useAppSelector((state) => state.list.isLocalMode);

  const maxLengthReached = rowsLength >= LIST_MAX_ROW_LENGTH;

  const {user} = useUser();

  const handleAddRowClick = () => {
    dispatch(listActions.addRow(createNewRow()));
  };

  const handleShowNamesToggle = () => {
    dispatch(listActions.setShowName(!showName));
  };

  const handleShowSourcesToggle = () => {
    dispatch(listActions.setShowSources(!showSources));
  };

  const handleRedirectSourcePageToggle = () => {
    dispatch(listActions.setRedirectSourcePage(!redirectSourcePage));
  };

  const shareLinkButtonClick = () => {
    copyToClipboard(window.location.href);
    toast("List url copied to clipboard", {type: "info", toastId: "url_copied"});
  };

  return (
    <div className="pb-2.5">
      {isListOwner || isLocalMode ? <ListNameInput /> : null}
      <div className="flex gap-2 lg:gap-0 lg:justify-between">
        <Tooltip
          showArrow
          color="foreground"
          placement="bottom"
          content={<span className="text-center">Toggle content names</span>}
          classNames={{
            base: "pointer-events-none",
          }}
        >
          <Button
            variant="flat"
            color={showName ? "primary" : "secondary"}
            onPress={handleShowNamesToggle}
          >
            {showName ? <EyeIcon size={ICON_SIZE} /> : <EyeOffIcon size={ICON_SIZE} />} Names
          </Button>
        </Tooltip>
        <Tooltip
          showArrow
          color="foreground"
          placement="bottom"
          content={<span className="text-center">Toggle content sources</span>}
          classNames={{
            base: "pointer-events-none",
          }}
        >
          <Button
            variant="flat"
            color={showSources ? "primary" : "secondary"}
            onPress={handleShowSourcesToggle}
          >
            {showSources ? <EyeIcon size={ICON_SIZE} /> : <EyeOffIcon size={ICON_SIZE} />} Sources
          </Button>
        </Tooltip>
      </div>
      <div className="mt-2 flex">
        <Tooltip
          showArrow
          color="foreground"
          placement="bottom"
          content={
            <span className="text-center w-48">
              Disables drag and drop, clicking content opens content source page
            </span>
          }
          classNames={{
            base: "pointer-events-none",
          }}
        >
          <Button
            variant="flat"
            color={redirectSourcePage ? "primary" : "secondary"}
            onPress={handleRedirectSourcePageToggle}
            className="lg:w-full"
          >
            {<ExternalLinkIcon size={ICON_SIZE} />}
            Click Opens Source
          </Button>
        </Tooltip>
      </div>

      <div className="text-base mb-1 mt-3">Actions</div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-1.5">
          <Button
            color="primary"
            isDisabled={maxLengthReached}
            onPress={handleAddRowClick}
            variant="flat"
          >
            {maxLengthReached ? "Max Row Length" : "Add Row"}
          </Button>
          <Tooltip
            showArrow
            color="foreground"
            placement="bottom"
            content={<span className="text-center">Copy list url</span>}
            classNames={{
              base: "pointer-events-none",
            }}
          >
            <Button
              variant="flat"
              startContent={<LinkIcon size={ICON_SIZE} />}
              onPress={shareLinkButtonClick}
            >
              Share
            </Button>
          </Tooltip>
        </div>

        {isListOwner || isLocalMode ? (
          <div className="mt-3">
            <DeleteListButton isLocalMode={isLocalMode} />
          </div>
        ) : null}
        <div className="mt-3 flex flex-col gap-2">
          {!fetchLoading ? <ListLocalSaveButton /> : null}

          {user && !fetchLoading && !isListOwner && !isLocalMode ? <ListCopyButton /> : null}

          <ListResetButton />
        </div>
      </div>
    </div>
  );
};

export default ListActions;
