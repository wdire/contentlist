import {Input} from "@nextui-org/react";
import clsx from "clsx";
import debounce from "lodash.debounce";
import {SearchIcon} from "lucide-react";
import {memo, useMemo, useRef, useState} from "react";

const StorageSearchInput = memo(function StorageSearchInput({
  setSearchValue,
}: {
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [inputFocus, setInputFocus] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const inputActive = inputFocus || inputValue;

  const debounceNameChange = useMemo(
    () =>
      debounce(async (search: string) => {
        setSearchValue(search);
      }, 400),
    [setSearchValue],
  );
  const handleSearchValueChange = (value: string) => {
    setInputValue(value);
    debounceNameChange(value);
  };

  return (
    <Input
      startContent={<SearchIcon size={18} className={clsx("absolute left-[7px]")} />}
      size="sm"
      ref={inputRef}
      isClearable
      classNames={{
        inputWrapper: clsx(
          "h-8 py-1 p-1 absolute top-5 z-10 max-w-[250px] !transition-[width] !duration-400",
          {
            "p-0 w-[calc(100%-210px)] sm:w-[250px] ": inputActive,
            "w-8 !cursor-pointer": !inputActive,
          },
        ),
        innerWrapper: clsx("p-0 !cursor-pointer"),
        input: clsx("", {
          "!ps-8 h-full": inputActive,
          "opacity-0 flex-shrink !ps-0 !cursor-pointer w-8": !inputActive,
        }),
      }}
      placeholder="Search"
      value={inputValue}
      onValueChange={handleSearchValueChange}
      onKeyDown={(e) => {
        if (e.key === "Enter" && inputValue === "") {
          inputRef.current?.blur();
          setInputFocus(false);
        }
      }}
      onClear={() => {
        setInputValue("");
        inputRef.current?.blur();
      }}
      onClick={() => setInputFocus(true)}
      onFocus={() => setInputFocus(true)}
      onBlur={() => setInputFocus(false)}
    />
  );
});

export default StorageSearchInput;
