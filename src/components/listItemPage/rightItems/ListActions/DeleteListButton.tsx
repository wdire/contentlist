import {useDeleteMutation} from "@/services/listApi";
import {useAppSelector} from "@/store";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import {Trash} from "lucide-react";
import React from "react";

const DeleteListButton = () => {
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
  const listId = useAppSelector((state) => state.list.info.id);

  const [trigger, {isLoading, error}] = useDeleteMutation();

  const onDeleteButtonClick = async () => {
    if (!listId) {
      console.error("listId not found");
      onClose();
      return;
    }

    try {
      await trigger({id: listId});
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Button onPress={onOpen} isIconOnly className="bg-red-500/20 text-red-500" variant="flat">
        <Trash />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <>
            <ModalHeader>Delete List</ModalHeader>
            <ModalBody>
              <div>
                <p>Are you sure you want to delete this list?</p>
              </div>

              {!isLoading && error ? (
                <div className="text-warning-500">Error occured while deleting!</div>
              ) : null}
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={onClose}>
                Close
              </Button>
              <Button isLoading={isLoading} className="bg-red-500" onPress={onDeleteButtonClick}>
                Delete
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteListButton;
