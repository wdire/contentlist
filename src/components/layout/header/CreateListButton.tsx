"use client";

import useIsMobile from "@/lib/hooks/useIsMobile";
import {useCreateMutation} from "@/services/listApi";
import {Button} from "@nextui-org/react";
import {Plus} from "lucide-react";
import {useRouter} from "next/navigation";

const CreateListButton = () => {
  const [trigger, {isLoading}] = useCreateMutation();
  const router = useRouter();

  const isMobile = useIsMobile();

  const handleCreateClick = async () => {
    try {
      const response = await trigger({
        name: "My Shiny List",
      }).unwrap();

      // Show toast if redirect to already existing unedited list

      if (response.data?.id) {
        router.push(`/list/${response.data?.id}`);
      } else {
        throw new Error("Couldn't get response data id");
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
