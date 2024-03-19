import {LIST_ROWS_ID} from "@/lib/constants";
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

const CreateImage = () => {
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
  const [imgUrl, setImgUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const listName = useAppSelector((state) => state.list.info.name);

  const handleCreateImageClick = async () => {
    try {
      setIsLoading(true);

      const clonedElm = document.getElementById(LIST_ROWS_ID)?.cloneNode(true) as HTMLElement;

      if (!clonedElm) {
        return;
      }

      const html2canvas = (await import("html2canvas")).default;

      // Fixes texts shifting down
      const style = document.createElement("style");
      document.body.prepend(style);
      style.sheet?.insertRule("body > div:last-child img { display: inline-block; }");

      // Images doesn't show in result image with having "srcset", need to remove it here.
      Object.values(clonedElm.querySelectorAll("img")).forEach((img) => {
        img.removeAttribute("srcset");
      });

      clonedElm.style.width = "890px";
      clonedElm.style.display = "none";

      const bottomWrapper = document.createElement("div");
      bottomWrapper.className =
        "flex justify-between items-center font-bold px-3 py-2 bg-content1 text-lg";

      const listNameDiv = document.createElement("div");
      listNameDiv.innerText = listName || "";

      const logoImg = document.createElement("img");
      logoImg.src = "/assets/white-horizontal-logo.png";
      logoImg.width = 175;
      logoImg.height = 32;

      logoImg.className = "block object-contain w-max h-8";

      bottomWrapper.appendChild(listNameDiv);
      bottomWrapper.appendChild(logoImg);

      // Remove row options buttons
      Object.values(clonedElm.querySelectorAll("& > div > div:nth-child(3)")).forEach((e) =>
        e.remove(),
      );

      clonedElm.appendChild(bottomWrapper);

      clonedElm.style.overflow = "hidden";

      document.body.append(clonedElm);

      await html2canvas(clonedElm, {
        windowWidth: 1400,
        windowHeight: 900,
        scale: 1,
        useCORS: true,
        onclone: (_doc, element) => {
          element.style.border = "1px solid black";
          element.style.display = "flex";
        },
      }).then((canvas) => {
        style.remove();
        clonedElm.remove();
        setIsLoading(false);

        canvas.toBlob(function toBlob(blob) {
          if (!blob) {
            return;
          }
          const url = URL.createObjectURL(blob);

          setImgUrl(url);

          onOpen();
        });
      });
    } catch (err) {
      console.error("err", err);
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
