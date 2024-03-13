"use client";

import {useCallback, useEffect} from "react";
import {useAppDispatch} from "@/store";
import {listActions} from "@/store/features/list/listSlice";
import {useUser} from "@clerk/nextjs";
import {useRouter} from "next/navigation";
import {createListFromDb} from "@/lib/utils/createList.utils";
import {ListByIdResponse} from "@/services/fetch/listFetch";
import ListViewContainer from "./ListViewContainer";

const ListItemPage = ({list}: {list: ListByIdResponse}) => {
  const {user} = useUser();
  const router = useRouter();

  const dispatch = useAppDispatch();

  const init = useCallback(async () => {
    if (list) {
      try {
        console.log("setting list");

        dispatch(
          listActions.initList(
            await createListFromDb({
              listGetData: list,
              currentUser: user,
            }),
          ),
        );
      } catch (err) {
        console.error("Error occured while transfering database data", err);
      }
    }
  }, [list, dispatch, user]);

  useEffect(() => {
    if (list === null) {
      router.replace("/");
    }
  }, [router, list]);

  useEffect(() => {
    init();
  }, [init]);

  return <ListViewContainer />;
};

export default ListItemPage;
