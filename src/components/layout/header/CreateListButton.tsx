"use client";

import useIsMobile from "@/lib/hooks/useIsMobile";
import {useCreateMutation} from "@/services/listApi";
import {Button} from "@nextui-org/react";
import {Plus} from "lucide-react";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";

const CreateListButton = () => {
  const [trigger, {isLoading}] = useCreateMutation();
  const router = useRouter();

  const isMobile = useIsMobile();

  const handleCreateClick = async () => {
    try {
      const response = await trigger({
        name: "My Shiny List",
      }).unwrap();

      if (response.data?.redirectListId) {
        if (response.data.type === "has_unedited") {
          toast("You already have a unedited list.", {
            type: "info",
          });
        } else if (response.data.type === "created") {
          toast("Created a new list.", {
            type: "success",
          });
        }
        router.push(`/list/${response.data.redirectListId}`);
      } else {
        throw new Error("Couldn't get redirectListId");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Button
      isLoading={isLoading}
      color="success"
      variant="flat"
      onPress={handleCreateClick}
      startContent={<>{!isLoading ? <Plus /> : null}</>}
      size={isMobile ? "sm" : "md"}
    >
      Create List
    </Button>
  );
};

export default CreateListButton;
