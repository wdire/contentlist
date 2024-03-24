import {LIST_ROWS_ID} from "../constants";

const THUMBNAIL_SIZE = 600;
let thumbnail_image: File | null = null;

const PREVIEW_SIZE = 880;

export const getGeneratedThumbnailImage = () => {
  return thumbnail_image;
};

export const setGeneratedThumbnailImage = (image: File | null) => {
  thumbnail_image = image;
};

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

    tmpContentCardsContainer.style.width = `${THUMBNAIL_SIZE}px`;
    tmpContentCardsContainer.style.height = `${THUMBNAIL_SIZE}px`;
    tmpContentCardsContainer.style.display = "none";
    tmpContentCardsContainer.style.width = `${THUMBNAIL_SIZE}px`;
    tmpContentCardsContainer.style.height = `${THUMBNAIL_SIZE}px`;

    // Apply grid css
    tmpContentCardsContainer.className = `thumbnail-c-con thumbnail-c-con_grid-${contentCards.length} bg-black`;

    contentCards.forEach((contentCard) => {
      const clonedContentCard = contentCard.cloneNode(true) as HTMLDivElement;

      // Remove content names or sources if showing any
      clonedContentCard.querySelector("& > div > div")?.remove();

      tmpContentCardsContainer.append(clonedContentCard);
    });

    const html2canvas = (await import("html2canvas")).default;

    // Fixes texts shifting down
    const style = document.createElement("style");
    document.body.prepend(style);
    style.sheet?.insertRule("body > div:last-child img { display: inline-block; }");

    document.body.append(tmpContentCardsContainer);

    const canvas = await html2canvas(tmpContentCardsContainer, {
      width: THUMBNAIL_SIZE,
      height: THUMBNAIL_SIZE,
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
    imgElement.style.width = `${THUMBNAIL_SIZE}px`;
    imgElement.src = blobUrl;
    document.body.appendChild(imgElement);
    */

    console.log("Create thumbnail");
    thumbnail_image = new File([imageBlob], "thumbnail.png", {
      type: "image/png",
    });
    return thumbnail_image;
  } catch (err) {
    console.error("err", err);
    return null;
  }
};

export const listPreviewGenerate = async ({listName}: {listName: string}) => {
  try {
    const clonedElm = document.getElementById(LIST_ROWS_ID)?.cloneNode(true) as HTMLElement;

    if (!clonedElm) {
      return false;
    }

    const html2canvas = (await import("html2canvas")).default;

    // Fixes texts shifting down
    const style = document.createElement("style");
    document.body.prepend(style);
    style.sheet?.insertRule("body > div:last-child img { display: inline-block; }");

    clonedElm.style.width = `${PREVIEW_SIZE}px`;
    clonedElm.style.border = "1px solid black";
    clonedElm.style.display = "none";

    // Bottom line container
    const bottomWrapper = document.createElement("div");
    bottomWrapper.className =
      "flex justify-between items-center font-bold px-3 py-2 bg-content1 text-lg";

    // Bottom list name
    const listNameDiv = document.createElement("div");
    listNameDiv.innerText = listName || "";

    // Bottom list image
    const logoImg = document.createElement("img");
    logoImg.src = "/assets/white-horizontal-logo.png";
    logoImg.width = 175;
    logoImg.height = 32;
    logoImg.className = "block object-contain w-max h-8";

    bottomWrapper.appendChild(listNameDiv);
    bottomWrapper.appendChild(logoImg);

    // Remove row options buttons
    Object.values(
      clonedElm.querySelectorAll("& > div > div:nth-child(2) > div:nth-child(2)"),
    ).forEach((e) => e.remove());

    clonedElm.appendChild(bottomWrapper);

    clonedElm.style.overflow = "hidden";

    document.body.append(clonedElm);

    const canvas = await html2canvas(clonedElm, {
      width: PREVIEW_SIZE,
      windowWidth: 1400,
      windowHeight: 900,
      backgroundColor: "#000",
      scale: 2,
      onclone: (_doc, element) => {
        element.style.display = "flex";
      },
    });
    style.remove();
    clonedElm.remove();

    const imageBlob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          console.error("No blob found");
        }
      });
    });

    return URL.createObjectURL(imageBlob);
  } catch (err) {
    console.error("err", err);
    return false;
  }
};
