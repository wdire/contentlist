"use client";

import {useEffect} from "react";
import {useAppDispatch} from "@/store";
import {listActions} from "@/store/features/list/listSlice";
import {useUser} from "@clerk/nextjs";
import {ListByIdResponse} from "@/services/actions/list.actions";
import {convertDBListToRedux} from "@/lib/utils/convertList.utils";
import {LocalMode} from "@/lib/utils/localMode.utils";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import ListViewContainer from "./ListViewContainer";

const ListItemPage = ({list, localId}: {list: ListByIdResponse | null; localId?: string}) => {
  const dispatch = useAppDispatch();
  const {user} = useUser();
  const router = useRouter();

  useEffect(() => {
    try {
      if (user === undefined) {
        // not knowing whether if its logged in or not
        return;
      }

      if (localId) {
        console.log("Setting local list");
        const localList = LocalMode.getList(Number(localId));
        if (localList) {
          dispatch(
            listActions.initList({
              contents: localList.contents,
              info: {
                cloudinaryImage: null,
                id: Number(localList.info.id),
                name: localList.info.name,
                isListOwner: undefined,
                owner: undefined,
                imageContents: undefined,
              },
              rows: localList.rows,
              startContents: localList.contents,
              isLocalMode: true,
              startRows: localList.rows,
            }),
          );
        } else {
          setTimeout(() => {
            router.push("/");
          }, 10000);

          toast(
            <>
              Local list not found. <br />
              Redirecting home...
            </>,
            {
              type: "error",
              autoClose: 10000,
            },
          );
        }
      } else if (list) {
        console.log("Setting online list");
        dispatch(
          listActions.initList(
            convertDBListToRedux({
              listGetData: list,
              currentUser: user,
            }),
          ),
        );
      }
    } catch (err) {
      console.error("Error occured while transfering database data", err);
    }
  }, [dispatch, list, localId, user, router]);

  return (
    <>
      <ListViewContainer />
    </>
  );
};

export default ListItemPage;
