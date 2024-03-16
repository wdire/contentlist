import {UploadApiResponse, v2 as cloudinary} from "cloudinary";
import prisma from "@/lib/prisma";
import {CLOUDINARY_LIST_THUMBS_FOLDER_NAME} from "@/lib/constants";
import {Prisma} from "@prisma/client";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// TODO: Add error log if either prisma or cloudinary delete/create failed, inconsistency error

const uploadImageCloudinary = (
  base64String: string,
  public_id: string | undefined = undefined,
): Promise<UploadApiResponse | undefined> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      `data:image/jpeg;base64,${base64String}`,
      {
        public_id,
        folder: CLOUDINARY_LIST_THUMBS_FOLDER_NAME,
        transformation: [{quality: "auto", fetch_format: "auto"}],
      },
      (err, res) => {
        if (err) {
          console.error(`Cloudinary: Error creating image. public_id: ${public_id}`);
          reject(err);
        }
        console.log(`Cloudinary: Created image in cloudinary. public_id: ${public_id}`);
        resolve(res);
      },
    );
  });
};

export const uploadImage = async ({
  base64String,
  public_id = undefined,
  listId = undefined,
}: {
  base64String: string;
  public_id: string | undefined;
  listId?: number;
}) => {
  const uploadedImage = await uploadImageCloudinary(base64String, public_id);

  if (!uploadedImage) {
    return false;
  }

  const imageInfo: Prisma.CloudinaryImageCreateInput = {
    publicId: uploadedImage.public_id,
    format: uploadedImage.format,
    version: `${uploadedImage.version}`,
  };

  if (listId) {
    imageInfo.List = {
      connect: {
        id: listId,
      },
    };
  }

  const createdImageInfo = await prisma.cloudinaryImage.upsert({
    where: {
      publicId: uploadedImage.public_id,
    },
    create: imageInfo,
    update: imageInfo,
  });

  console.log(`Cloudinary: Created image in database. public_id: ${public_id}`);

  return createdImageInfo;
};

export const deleteImage = async (public_id: string | undefined = undefined): Promise<boolean> => {
  if (!public_id) {
    return false;
  }

  try {
    const cloudinaryDeletedImage = await cloudinary.uploader.destroy(public_id);

    if (cloudinaryDeletedImage.result !== "ok") {
      throw new Error("Cloudinary delete response is not 'ok'");
    }

    console.log(`Cloudinary: Deleted image from cloudinary. public_id: ${public_id}`);

    await prisma.cloudinaryImage.delete({
      where: {
        publicId: public_id,
      },
    });

    console.log(`Cloudinary: Deleted image from database. public_id: ${public_id}`);

    return true;
  } catch (err) {
    console.error(`Cloudinary: Error deleting image. public_id: ${public_id}`, err);
    return false;
  }
};
