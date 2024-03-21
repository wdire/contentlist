import {LocalMode} from "@/lib/utils/localMode.utils";
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
import {useRouter} from "next/navigation";
import React from "react";
import {toast} from "react-toastify";

const DeleteListButton = ({isLocalMode}: {isLocalMode?: boolean}) => {
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
  const listId = useAppSelector((state) => state.list.info.id);
  const router = useRouter();

  const [trigger, {isLoading, error}] = useDeleteMutation();

  const onDeleteButtonClick = async () => {
    if (!listId) {
      console.error("listId not found");
      onClose();
      return;
    }

    if (isLocalMode) {
      LocalMode.deleteList(listId);
      toast("Deleted local list ", {
        type: "success",
      });
      router.push("/local-lists");
    } else {
      try {
        await trigger({id: listId});

        // TODO: Redirect to user's page
        toast("Deleted list ", {
          type: "success",
        });
        router.push("/");
      } catch (err) {
        toast("Couldn't delete list", {
          type: "error",
        });
        console.error(err);
      }
    }
  };

  return (
    <>
      <Button
        onPress={onOpen}
        startContent={<Trash size={18} />}
        color="danger"
        variant="flat"
        className="w-max"
      >
        Delete List
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
              <Button color="primary" variant="flat" onPress={onClose}>
                Cancel
              </Button>
              <Button
                isLoading={isLoading}
                color="danger"
                variant="flat"
                onPress={onDeleteButtonClick}
              >
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
