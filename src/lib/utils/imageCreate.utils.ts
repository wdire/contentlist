// image ratio = 1/1, size = (pure size) + (1px gap * column length) = 600 + 5
const IMAGE_SIZE = 605;

// TODO: Different grid layouts depending on contents length

export const listThumbnailGenerate = async () => {
  try {
    // Get first 12 content cards
    const contentCards = Array.prototype.slice.call(
      document.querySelectorAll("[data-contentcard='true']"),
      0,
      12,
    );

    const tmpContentCardsContainer = document.createElement("div");

    tmpContentCardsContainer.style.width = `${IMAGE_SIZE}px`;
    tmpContentCardsContainer.style.height = `${IMAGE_SIZE}px`;
    tmpContentCardsContainer.style.display = "none";
    tmpContentCardsContainer.style.width = "100%";
    tmpContentCardsContainer.style.height = "100%";

    // Apply grid css
    tmpContentCardsContainer.className = "thumbnail-c-con bg-black";

    contentCards.forEach((contentCard) => {
      const clonedContentCard = contentCard.cloneNode(true) as HTMLDivElement;
      tmpContentCardsContainer.append(clonedContentCard);
    });

    const html2canvas = (await import("html2canvas")).default;

    // Fixes texts shifting down
    const style = document.createElement("style");
    document.body.prepend(style);
    style.sheet?.insertRule("body > div:last-child img { display: inline-block; }");

    // Images doesn't show in result image with having "srcset", need to remove it here.
    tmpContentCardsContainer.querySelectorAll("img").forEach((img) => {
      img.removeAttribute("srcset");
    });

    document.body.append(tmpContentCardsContainer);

    const canvas = await html2canvas(tmpContentCardsContainer, {
      // + 2 comes from border
      width: IMAGE_SIZE + 2,
      height: IMAGE_SIZE + 2,
      windowWidth: 800,
      windowHeight: 800,
      scale: 1,
      onclone: (_doc, element) => {
        element.style.border = "1px solid black";
        element.style.display = "grid";
      },
    });
    style.remove();
    tmpContentCardsContainer.remove();

    const imageBlob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          console.error("No blob found");
        }
      });
    });

    // Test, preview image on browser
    /*
    const blobUrl = URL.createObjectURL(imageBlob);
    const imgElement = document.createElement("img");
    imgElement.style.width = `${IMAGE_SIZE}px`;
    imgElement.src = blobUrl;
    document.body.appendChild(imgElement);
    */

    return new File([imageBlob], "thumbnail.png", {
      type: "image/png",
    });
  } catch (err) {
    console.error("err", err);
    return false;
  }
};
