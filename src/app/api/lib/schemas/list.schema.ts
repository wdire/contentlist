import {Prisma} from "@prisma/client";
import {ZodType, z} from "zod";
import {rowColors} from "@/lib/constants";
import {ContentSourceType} from "@/lib/types/list.type";
import {AnilistMediaType} from "@/services/anilistApi/anilist.type";
import {ResponseBodyType} from "../response.api";
import {ZodDbId, ZodTypeOf} from "../index.type.api";
import {TmdbMediaType} from "./tmdb.schema";

const ListContentSchema = z.object({
  name: z.string(),
  image_url: z.string(),
  source: z.enum(ContentSourceType),
  notPoster: z.boolean().optional(),
  tmdb: z
    .object({
      id: z.number(),
      media_type: z.enum(TmdbMediaType),
    })
    .optional()
    .nullable(),
  anilist: z
    .object({
      id: z.number(),
      type: z.enum(AnilistMediaType),
    })
    .optional()
    .nullable(),
  igdb: z
    .object({
      id: z.number(),
    })
    .optional()
    .nullable(),
  wikipedia: z
    .object({
      id: z.number(),
    })
    .optional()
    .nullable(),
}) satisfies ZodType<PrismaJson.ContentType>;

const ImageSchema = z
  .any()
  .refine((file) => file instanceof File || file === null, "Image should be a file or null.")
  .refine((file) => {
    return file === null || file?.size <= 1024 * 1024 * 1;
  }, `Max image size is 1MB.`)
  .refine(
    (file) => file === null || ["image/png"].includes(file?.type),
    "Only .png format is supported.",
  );

const ListObjectSchema = z.object({
  name: z.string(),
  rows: z.array(
    z.object({
      name: z.string(),
      color: z.enum(rowColors),
      row_id: z.string(),
      contents: z.array(ListContentSchema),
    }),
  ),
  storage: z.array(ListContentSchema),
}) satisfies ZodType<{
  name: string;
  rows: PrismaJson.RowsType[];
  storage: PrismaJson.ContentType[];
}>;

const ListUpdateSchema = z.object({
  body: ListObjectSchema.optional(),
  image: ImageSchema.optional(),
  deleteImage: z.boolean().optional(),
  imageContents: z.string().optional(),
});

export const ListSchemas = {
  "/list/get": {
    params: z.object({
      id: ZodDbId,
    }),
  },
  "/list/update": {
    formdata: ListUpdateSchema,
    params: z.object({
      id: ZodDbId,
    }),
  },
  "/list/create": {
    formdata: z
      .object({
        name: ListObjectSchema.shape.name,
      })
      .or(
        z.object({
          copyListId: z.number(),
          contentsData: z.object({
            rows: ListObjectSchema.shape.rows,
            storage: ListObjectSchema.shape.storage,
          }),
          image: ImageSchema,
        }),
      ),
  },
  "/list/delete": {
    params: z.object({
      id: ZodDbId,
    }),
  },
  "/list/getAllByUserId": {
    params: z.object({
      userId: z.string().min(10),
    }),
  },
};

export type ListRequestTypes = {
  "/list/update": {
    params: ZodTypeOf<(typeof ListSchemas)["/list/update"]["params"]>;
    formdata: ZodTypeOf<(typeof ListSchemas)["/list/update"]["formdata"]>;
    response: ResponseBodyType<
      Prisma.ListGetPayload<{
        include: {
          cloudinaryImage: {
            select: {
              publicId: true;
              version: true;
            };
          };
        };
      }>
    >;
  };
  "/list/create": {
    formdata: ZodTypeOf<(typeof ListSchemas)["/list/create"]["formdata"]>;
    response: ResponseBodyType<{
      type: "created" | "has_unedited" | "copy_limit_exceeded";
      redirectListId?: Prisma.ListGetPayload<object>["id"];
    }>;
  };
  "/list/delete": {
    params: ZodTypeOf<(typeof ListSchemas)["/list/delete"]["params"]>;
    response: null;
  };
};
