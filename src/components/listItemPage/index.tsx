"use client";

import {useEffect} from "react";
import {useAppDispatch} from "@/store";
import {listActions} from "@/store/features/list/listSlice";
import {useUser} from "@clerk/nextjs";
import {ListByIdResponse} from "@/services/actions/list.actions";
import {convertDBListToRedux} from "@/lib/utils/convertList.utils";
import ListViewContainer from "./ListViewContainer";

const ListItemPage = ({list}: {list: ListByIdResponse}) => {
  const {user} = useUser();

  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      console.log("setting list");

      dispatch(
        listActions.initList(
          convertDBListToRedux({
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
