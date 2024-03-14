"use client";

import {useEffect} from "react";
import {useAppDispatch} from "@/store";
import {listActions} from "@/store/features/list/listSlice";
import {useUser} from "@clerk/nextjs";
import {createListFromDb} from "@/lib/utils/createList.utils";
import {ListByIdResponse} from "@/services/fetch/listFetch";
import ListViewContainer from "./ListViewContainer";

const ListItemPage = ({list}: {list: ListByIdResponse}) => {
  const {user} = useUser();

  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      console.log("setting list");

      document.title = `${list.name} - ContentList`;

      dispatch(
        listActions.initList(
          createListFromDb({
            listGetData: list,
            currentUser: user,
          }),
        ),
      );
    } catch (err) {
      console.error("Error occured while transfering database data", err);
    }
  }, [dispatch, list, user]);

  return (
    <>
      <ListViewContainer />
    </>
  );
};

export default ListItemPage;
