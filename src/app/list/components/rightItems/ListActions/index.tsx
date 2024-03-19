import {useAppDispatch, useAppSelector} from "@/store";
import {listActions} from "@/store/features/list/listSlice";
import {Button, Input, Tooltip} from "@nextui-org/react";
import debounce from "lodash.debounce";
import React from "react";
import {LIST_MAX_ROW_LENGTH} from "@/lib/constants";
import {copyToClipboard, createNewRow} from "@/lib/utils/helper.utils";
import {EyeIcon, EyeOffIcon, LinkIcon} from "lucide-react";
import {toast} from "react-toastify";
import DeleteListButton from "./DeleteListButton";
import CreateImage from "./CreateImage";

const ListActions = () => {
  const dispatch = useAppDispatch();
  const showName = useAppSelector((state) => state.list.showName);
  const rowsLength = useAppSelector((state) => state.list.rows.length);
  const listName = useAppSelector((state) => state.list.info.name);
  const isListOwner = useAppSelector((state) => state.list.info.isListOwner);
  const isLocalMode = useAppSelector((state) => state.list.isLocalMode);

  const maxLengthReached = rowsLength >= LIST_MAX_ROW_LENGTH;

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

  const shareLinkButtonClick = () => {
    copyToClipboard(window.location.href);
    toast("List url copied to clipboard", {type: "info"});
  };

  return (
    <div className="pb-2.5">
      <Input
        label="Name"
        onValueChange={debounce(handleChangeListName, 500)}
        defaultValue={listName}
        maxLength={47}
      />
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
          {showName ? <EyeIcon /> : <EyeOffIcon />} Names
        </Button>
      </Tooltip>

      <div className="text-base mb-3 mt-4">Actions</div>
      <div className="flex items-center justify-between">
        <Button
          color="primary"
          isDisabled={maxLengthReached}
          onPress={handleAddRowClick}
          variant="flat"
        >
          {maxLengthReached ? "Max Row Length" : "Add Row"}
        </Button>
        {isListOwner || isLocalMode ? <DeleteListButton isLocalMode={isLocalMode} /> : null}
      </div>

      <div className="text-base mb-3 mt-4">Share</div>
      <div className="flex items-center justify-between">
        <Tooltip
          showArrow
          color="foreground"
          placement="top"
          content={<span className="text-center">Copy list url</span>}
        >
          <Button variant="flat" isIconOnly onPress={shareLinkButtonClick}>
            <LinkIcon />
          </Button>
        </Tooltip>

        <CreateImage />
      </div>
    </div>
  );
};

export default ListActions;
