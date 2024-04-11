"use client";

import {searchSources} from "@/lib/config";
import {SearchSource} from "@/lib/types/search.type";
import {useAppDispatch, useAppSelector} from "@/store";
import {searchActions} from "@/store/features/search/searchSlice";
import {Select, SelectItem, SelectSection} from "@nextui-org/react";

const SearchSourceSelect = () => {
  const dispatch = useAppDispatch();

  const searchSource = useAppSelector((state) => state.search.searchSource);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(searchActions.setSearchSource(e.target.value as SearchSource));
  };

  return (
    <Select
      label="Source"
      disallowEmptySelection
      className="mb-3"
      radius="md"
      selectedKeys={[searchSource]}
      listboxProps={{
        itemClasses: {
          base: "h-10",
        },
      }}
      classNames={{
        listboxWrapper: "max-h-72 scrollbar-show",
      }}
      onChange={handleSelectChange}
    >
      {searchSources.map((source) => {
        if (source.value === "_group_") {
          return (
            <SelectSection
              key={source.label}
              title={source.label}
              classNames={{
                group: "ml-3",
                heading:
                  "py-1.5 px-2.5 bg-default-100 shadow-small rounded-small text-sm w-full block",
              }}
            >
              {source?.items?.map((subSource) => (
                <SelectItem
                  key={subSource.value}
                  value={subSource.value}
                  hideSelectedIcon={searchSource !== subSource.value}
                >
                  {subSource.label}
                </SelectItem>
              )) || []}
            </SelectSection>
          );
        }

        return (
          <SelectItem
            key={source.value}
            value={source.value}
            hideSelectedIcon={searchSource !== source.value}
          >
            {source.label}
          </SelectItem>
        );
      })}
    </Select>
  );
};

export default SearchSourceSelect;
