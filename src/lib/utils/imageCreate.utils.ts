const IMAGE_SIZE = 600;

export const listThumbnailGenerate = async () => {
  try {
    // Get first 12 content cards
    const contentCards = Array.prototype.slice.call(
      document.querySelectorAll("[data-contentcard='true']"),
      0,
      12,
    );

    if (!(contentCards.length >= 3)) {
      return null;
    }

    const tmpContentCardsContainer = document.createElement("div");

    tmpContentCardsContainer.style.width = `${IMAGE_SIZE}px`;
    tmpContentCardsContainer.style.height = `${IMAGE_SIZE}px`;
    tmpContentCardsContainer.style.display = "none";
    tmpContentCardsContainer.style.width = `${IMAGE_SIZE}px`;
    tmpContentCardsContainer.style.height = `${IMAGE_SIZE}px`;

    // Apply grid css
    tmpContentCardsContainer.className = `thumbnail-c-con thumbnail-c-con_grid-${contentCards.length} bg-black`;

    contentCards.forEach((contentCard) => {
      const clonedContentCard = contentCard.cloneNode(true) as HTMLDivElement;

      clonedContentCard.querySelector("& > div")?.remove();

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
      width: IMAGE_SIZE,
      height: IMAGE_SIZE,
      windowWidth: 800,
      windowHeight: 800,
      scale: 1,
      onclone: (_doc, element) => {
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

    console.log("Create thumbnail");

    return new File([imageBlob], "thumbnail.png", {
      type: "image/png",
    });
  } catch (err) {
    console.error("err", err);
    return null;
  }
};
