import {MAX_LENGTHS} from "@/lib/constants";
import {Row} from "@/lib/types/list.type";
import {useAppDispatch, useAppSelector} from "@/store";
import {listActions} from "@/store/features/list/listSlice";
import {Button, Input, Popover, PopoverContent, PopoverTrigger} from "@nextui-org/react";
import clsx from "clsx";
import {Settings, Trash} from "lucide-react";
import React, {useState} from "react";

const ColorItem = ({
  colorName,
  active,
  ...props
}: {colorName: PrismaJson.RowsType["color"]; active?: boolean} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) => (
  <div
    className={clsx("w-8 h-8 rounded-full cursor-pointer transition-all", {
      "ring-2 ring-white scale-125": active,
      "hover:opacity-75": !active,
    })}
    style={{
      backgroundColor: `var(--rowColor-${colorName})`,
    }}
    {...props}
  ></div>
);

const selectColors: {color: PrismaJson.RowsType["color"]}[] = [
  {color: "red"},
  {color: "orange"},
  {color: "light-orange"},
  {color: "yellow"},
  {color: "lime-green"},
  {color: "green"},
  {color: "turquoise"},
  {color: "light-blue"},
  {color: "blue"},
  {color: "magenta"},
  {color: "purple"},
  {color: "black"},
  {color: "gray"},
  {color: "silver"},
  {color: "white"},
];

const RowOptionsPopover = ({row}: {row: Row}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [rowTitleInputValue, setRowTitleInputValue] = useState(row.title);
  const [rowColorValue, setRowColorValue] = useState<PrismaJson.RowsType["color"]>(row.color);
  const isLastRow = useAppSelector((state) => state.list.rows.length === 1);

  const dispatch = useAppDispatch();

  const handleEditButtonClick = () => {
    dispatch(
      listActions.editRowInfo({
        ...row,
        color: rowColorValue,
        title: rowTitleInputValue,
      }),
    );
    setIsPopoverOpen(false);
  };

  const handleRowDeleteClick = () => {
    dispatch(listActions.deleteRow(row));
    setIsPopoverOpen(false);
  };

  const resetStates = () => {
    setRowTitleInputValue(row.title);
    setRowColorValue(row.color);
  };

  const onOpenChange = (isOpen: boolean) => {
    if (isOpen === false) {
      resetStates();
    }
    setIsPopoverOpen(isOpen);
  };

  const onMoveRowClick = (dir: "up" | "down") => {
    dispatch(
      listActions.moveRowUpDown({
        rowId: row.id,
        dir,
      }),
    );
  };

  return (
    <Popover placement="left" backdrop="opaque" isOpen={isPopoverOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger>
        <button
          className="py-2 sm:py-4 px-2 cursor-pointer text-default-500 transition-colors hover:text-default-700 select-none"
          aria-label="Row Options"
        >
          <Settings className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="bg-content1">
        <div className="py-4 px-2 w-52">
          <div className="text-lg mb-3">Row Options</div>
          <div className="flex items-center gap-4 mb-2">
            <div>Move</div>
            <div className="flex justify-between w-full">
              <Button size="sm" variant="flat" color="primary" onPress={() => onMoveRowClick("up")}>
                Up
              </Button>
              <Button
                size="sm"
                variant="flat"
                color="secondary"
                onPress={() => onMoveRowClick("down")}
              >
                Down
              </Button>
            </div>
          </div>
          <div>
            <label className="block mb-2">Title</label>
            <Input
              value={rowTitleInputValue}
              onValueChange={setRowTitleInputValue}
              onKeyDown={(key) =>
                (key.key === "Enter" || key.which === 13) && handleEditButtonClick()
              }
              maxLength={MAX_LENGTHS.max_row_name_length}
              size="sm"
            />
          </div>

          <div className="mt-5">
            <label className="block mb-2">Color</label>
            <div className="flex flex-wrap gap-2">
              {selectColors.map((value) => {
                return (
                  <ColorItem
                    key={value.color}
                    active={value.color === rowColorValue}
                    colorName={value.color}
                    onClick={() => setRowColorValue(value.color)}
                  />
                );
              })}
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <Button color="warning" variant="flat" onPress={handleEditButtonClick}>
              Edit
            </Button>

            <Button
              isIconOnly
              color="danger"
              variant="flat"
              isDisabled={isLastRow}
              onPress={handleRowDeleteClick}
            >
              <Trash />
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default RowOptionsPopover;
