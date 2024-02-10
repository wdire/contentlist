"use client";

import {useGetQuery} from "@/services/listApi";
import {useEffect} from "react";
import {useAppDispatch} from "@/store";
import {listActions} from "@/store/features/list/listSlice";
import {createListFromDb} from "@/lib/utils";
import {Skeleton} from "@nextui-org/react";
import ListViewContainer from "./ListViewContainer";

const ListItemPage = ({id}: {id: string}) => {
  const {data} = useGetQuery({id: Number(id)});

  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("data", data);
    if (data?.data) {
      dispatch(
        listActions.initList(
          createListFromDb({
            id: data?.data?.id,
            name: data?.data?.name,
            rows: data?.data?.rows,
            storage: data?.data?.storage,
          }),
        ),
      );
    }
  }, [dispatch, data]);

  return <ListViewContainer />;
};

export default ListItemPage;
