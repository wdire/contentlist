"use client";

import {useCreateMutation} from "@/services/listApi";
import {Button} from "@nextui-org/react";
import {useRouter} from "next/navigation";

const CreateListButton = () => {
  const [trigger, {isLoading}] = useCreateMutation();
  const router = useRouter();

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
      className=""
      color="success"
      variant="light"
      onPress={handleCreateClick}
    >
      Create List
    </Button>
  );
};

export default CreateListButton;
