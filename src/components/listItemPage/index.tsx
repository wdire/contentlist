"use client";

import {useGetQuery} from "@/services/listApi";
import {useCallback, useEffect} from "react";
import {useAppDispatch} from "@/store";
import {listActions} from "@/store/features/list/listSlice";
import {useUser} from "@clerk/nextjs";
import {useRouter} from "next/navigation";
import {createListFromDb} from "@/lib/utils/createList.utils";
import ListViewContainer from "./ListViewContainer";

const ListItemPage = ({id}: {id: string}) => {
  const {data, isFetching, error} = useGetQuery({id: Number(id)});
  const {user} = useUser();
  const router = useRouter();

  const dispatch = useAppDispatch();

  const init = useCallback(async () => {
    if (data?.data) {
      try {
        console.log("setting list");
        dispatch(
          listActions.initList(
            await createListFromDb({
              listGetData: data?.data,
              currentUser: user,
            }),
          ),
        );
      } catch (err) {
        console.error("Error occured while transfering database data", err);
      }
    }
  }, [data?.data, dispatch, user]);

  useEffect(() => {
    if ((!isFetching && data?.data === null) || error) {
      router.replace("/");
    }
  }, [router, isFetching, data?.data, error]);

  useEffect(() => {
    init();
  }, [init]);

  return <ListViewContainer />;
};

export default ListItemPage;
