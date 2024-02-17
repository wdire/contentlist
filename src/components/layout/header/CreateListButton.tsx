"use client";

import {useCreateMutation} from "@/services/listApi";
import {Button} from "@nextui-org/react";

const CreateListButton = () => {
  const [trigger, {isLoading}] = useCreateMutation();

  const handleCreateClick = async () => {
    try {
      await trigger({
        name: "My Shiny List",
      });
    } catch (err) {
      console.error(err);
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
