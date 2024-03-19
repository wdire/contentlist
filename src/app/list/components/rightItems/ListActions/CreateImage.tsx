import {listPreviewGenerate} from "@/lib/utils/imageCreate.utils";
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
import Image from "next/image";
import {useState} from "react";
import {toast} from "react-toastify";

const CreateImage = () => {
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
  const [imgUrl, setImgUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const listName = useAppSelector((state) => state.list.info.name);

  const handleCreateImageClick = async () => {
    setIsLoading(true);
    const thumbnailUrl = await listPreviewGenerate({listName: listName || ""});
    setIsLoading(false);

    if (thumbnailUrl) {
      setImgUrl(thumbnailUrl);
      onOpen();
    } else {
      toast("Couldn't create list preview image", {
        type: "error",
      });
    }
  };

  const handleDownloadClick = () => {
    const link = document.createElement("a");
    link.href = imgUrl;
    link.download = `${listName} list.png`;

    link.click();

    link.remove();
  };

  return (
    <div className="flex gap-1">
      <Button isLoading={isLoading} color="warning" onPress={handleCreateImageClick} variant="flat">
        {isLoading ? "Creating" : "Create Image"}
      </Button>
      {imgUrl ? (
        <>
          <div
            className="relative cursor-pointer transition-transform hover:scale-95 text-white/70 text-sm "
            onClick={onOpen}
          >
            <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10">
              View
            </div>
            <Image
              width={50}
              height={50}
              src={imgUrl}
              alt="List Preview Image"
              className="inline-block w-13 max-w-14 h-10 object-contain border-1 border-white/40 rounded-lg"
            />
          </div>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
            <ModalContent>
              <>
                <ModalHeader>List Image</ModalHeader>
                <ModalBody>
                  <p>You can copy paste or download image.</p>
                  <div className="overflow-y-auto max-h-[350px] sm:max-h-[500px]">
                    <Image
                      src={imgUrl}
                      width={500}
                      height={500}
                      alt="List Preview Image Big"
                      className="w-full object-contain max-h-[600px] sm:max-h-[800px]"
                      unoptimized
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="success" variant="flat" onPress={handleDownloadClick}>
                    Download
                  </Button>
                </ModalFooter>
              </>
            </ModalContent>
          </Modal>
        </>
      ) : null}
    </div>
  );
};

export default CreateImage;
