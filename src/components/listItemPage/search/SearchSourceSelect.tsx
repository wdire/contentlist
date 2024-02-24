"use client";

import {searchSources} from "@/lib/config";
import {SearchSource} from "@/lib/types/search.type";
import {useAppDispatch, useAppSelector} from "@/store";
import {searchActions} from "@/store/features/search/searchSlice";
import {Select, SelectItem} from "@nextui-org/react";

const SearchSourceSelect = () => {
  const dispatch = useAppDispatch();

  const searchSource = useAppSelector((state) => state.search.searchSource);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(searchActions.setSearchSource(e.target.value as SearchSource));
  };

  return (
    <Select
      size="sm"
      label="Source"
      disallowEmptySelection
      className="mb-3"
      radius="md"
      selectedKeys={[searchSource]}
      disabledKeys={["igdb"]}
      listboxProps={{
        itemClasses: {
          base: "h-10",
        },
      }}
      onChange={handleSelectChange}
    >
      {searchSources.map((source) => (
        <SelectItem key={source.value} value={source.value}>
          {source.label}
        </SelectItem>
      ))}
    </Select>
  );
};

export default SearchSourceSelect;
