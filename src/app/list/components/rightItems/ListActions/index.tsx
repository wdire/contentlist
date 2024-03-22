import {useAppDispatch, useAppSelector} from "@/store";
import {listActions} from "@/store/features/list/listSlice";
import {Button, Input, Tooltip} from "@nextui-org/react";
import debounce from "lodash.debounce";
import React from "react";
import {LIST_MAX_ROW_LENGTH, MAX_LENGTHS} from "@/lib/constants";
import {copyToClipboard, createNewRow} from "@/lib/utils/helper.utils";
import {EyeIcon, EyeOffIcon, LinkIcon} from "lucide-react";
import {toast} from "react-toastify";
import {useUser} from "@clerk/nextjs";
import DeleteListButton from "./DeleteListButton";
import ListLocalSaveButton from "../ListLocalSaveButton";
import ListCopyButton from "../ListCopyButton";
import ListResetButton from "../ListResetButton";

const ICON_SIZE = 18;

const ListActions = () => {
  const dispatch = useAppDispatch();

  const fetchLoading = useAppSelector((state) => state.list.fetchLoading);
  const showName = useAppSelector((state) => state.list.showName);
  const showSources = useAppSelector((state) => state.list.showSources);
  const rowsLength = useAppSelector((state) => state.list.rows.length);
  const listName = useAppSelector((state) => state.list.info.name);
  const isListOwner = useAppSelector((state) => state.list.info.isListOwner);
  const isLocalMode = useAppSelector((state) => state.list.isLocalMode);

  const maxLengthReached = rowsLength >= LIST_MAX_ROW_LENGTH;

  const {user} = useUser();

  const handleAddRowClick = () => {
    dispatch(listActions.addRow(createNewRow()));
  };

  const handleChangeListName = (value: string) => {
    if (value) {
      dispatch(listActions.editListInfo({name: value}));
    }
  };

  const handleShowNamesToggle = () => {
    dispatch(listActions.setShowName(!showName));
  };

  const handleShowSourcesToggle = () => {
    dispatch(listActions.setShowSources(!showSources));
  };

  const shareLinkButtonClick = () => {
    copyToClipboard(window.location.href);
    toast("List url copied to clipboard", {type: "info", toastId: "url_copied"});
  };

  return (
    <div className="pb-2.5">
      <Input
        label="Name"
        onValueChange={debounce(handleChangeListName, 500)}
        defaultValue={listName}
        maxLength={MAX_LENGTHS.list_title}
      />
      <div className="flex gap-2 lg:gap-0 lg:justify-between">
        <Tooltip
          showArrow
          color="foreground"
          placement="top"
          content={<span className="text-center">Show/Hide content names</span>}
        >
          <Button
            variant="flat"
            color={showName ? "primary" : "secondary"}
            className="mt-2"
            onPress={handleShowNamesToggle}
          >
            {showName ? <EyeIcon size={ICON_SIZE} /> : <EyeOffIcon size={ICON_SIZE} />} Names
          </Button>
        </Tooltip>
        <Tooltip
          showArrow
          color="foreground"
          placement="top"
          content={<span className="text-center">Show/Hide content names</span>}
        >
          <Button
            variant="flat"
            color={showSources ? "primary" : "secondary"}
            className="mt-2"
            onPress={handleShowSourcesToggle}
          >
            {showSources ? <EyeIcon size={ICON_SIZE} /> : <EyeOffIcon size={ICON_SIZE} />} Sources
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
            placement="top"
            content={<span className="text-center">Copy list url</span>}
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
          {!fetchLoading && !user ? <ListLocalSaveButton /> : null}

          {user && !fetchLoading && !isListOwner && !isLocalMode ? <ListCopyButton /> : null}

          <ListResetButton />
        </div>
      </div>
    </div>
  );
};

export default ListActions;
