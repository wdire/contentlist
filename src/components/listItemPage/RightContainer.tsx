"use client";

import {Button, Skeleton} from "@nextui-org/react";
import {useAppSelector} from "@/store";
import listSelectors from "@/store/features/list/listSelectors";
import {createListFromDnd} from "@/lib/utils";
import {useLazyUpdateQuery} from "@/services/listApi";
import SearchContainer from "./search/SearchContainer";

const RightContainer = () => {
  const fetchLoading = useAppSelector(listSelectors.selectFetchLoading);

  const list = useAppSelector((state) => state.list);

  const [trigger, {isFetching}] = useLazyUpdateQuery();

  const handleSaveClick = async () => {
    const response = await trigger(createListFromDnd(list));

    console.log("response", response);
  };

  return (
    <Skeleton className="" isLoaded={!fetchLoading}>
      <div className="w-[250px] h-full">
        <SearchContainer />
        <Button color="success" isLoading={isFetching} onClick={handleSaveClick} className="mt-10">
          Save
        </Button>
      </div>
    </Skeleton>
  );
};

export default RightContainer;
