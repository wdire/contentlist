"use client";

import {useEffect, useState} from "react";
import {LocalMode} from "@/lib/utils/localMode.utils";
import {LocalModeType} from "@/lib/types/localMode.type";
import {Button} from "@nextui-org/react";
import {defaultNewListInfo} from "@/lib/config";
import {useRouter} from "next/navigation";
import SectionContainer from "@/components/common/SectionContainer";
import {ListItemCard} from "@/components/cards/ListItemCard";

const LocalLists = () => {
  const [localLists, setLocalLists] = useState<LocalModeType | null | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    setLocalLists(LocalMode.getLists());
  }, []);

  const createLocalList = () => {
    const id = -Math.floor(Math.random() * 10000);

    LocalMode.setList({
      contents: [],
      rows: defaultNewListInfo.rows,
      info: {
        id,
        name: "My Shiny Local List",
      },
    });

    router.push(`/list/${id}?local=true`);
  };

  return (
    <SectionContainer className="py-page-top-space">
      <div className="flex items-center justify-between gap-10 mb-4">
        <h1 className={"text-3xl font-medium"}>
          <span className="text-secondary">Local</span> Lists
        </h1>
        <Button variant="flat" color="secondary" onPress={createLocalList}>
          Create Local List
        </Button>
      </div>
      <div className="flex gap-3 md:flex-wrap overflow-x-auto md:overflow-x-hidden pb-2 rounded-medium">
        {localLists === null ? (
          <div className="italic">
            No local contents added. <br />
            <br />
            Copy/Save existing lists to local or <br /> Sign in to create and share lists.
          </div>
        ) : (
          localLists?.lists?.map((ListInTopicItem, listIndex) => (
            <ListItemCard
              list={{
                id: ListInTopicItem.info.id,
                name: ListInTopicItem.info.name,
                cloudinaryImage: null,
              }}
              key={listIndex}
              isLocal
            />
          ))
        )}
      </div>
    </SectionContainer>
  );
};

export default LocalLists;
