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
  )
  .optional();

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

const ListUpdateCreateSchema = z.object({
  body: ListObjectSchema,
  image: ImageSchema,
  deleteImage: z.boolean().optional(),
});

export const ListSchemas = {
  "/list/get": {
    params: z.object({
      id: ZodDbId,
    }),
  },
  "/list/update": {
    body: ListObjectSchema,
    formdata: ListUpdateCreateSchema,
    params: z.object({
      id: ZodDbId,
    }),
  },
  "/list/create": {
    body: ListObjectSchema.pick({
      name: true,
    }),
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
  "/list/get": {
    params: ZodTypeOf<(typeof ListSchemas)["/list/get"]["params"]>;
    response: ResponseBodyType<
      Prisma.ListGetPayload<{
        include: {
          user: true;
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
  "/list/getHomeLists": {
    response: ResponseBodyType<
      Prisma.TopicGetPayload<{
        select: {
          id: true;
          name: true;
          ListInTopic: {
            select: {
              index: true;
              list: {
                select: {
                  id: true;
                  name: true;
                  cloudinaryImage: {
                    select: {
                      publicId: true;
                      version: true;
                    };
                  };
                };
              };
            };
          };
        };
      }>[]
    >;
    types: {
      list: Prisma.ListGetPayload<{
        select: {
          id: true;
          name: true;
          cloudinaryImage: {
            select: {
              publicId: true;
              version: true;
            };
          };
        };
      }>;
    };
  };
  "/list/update": {
    params: ZodTypeOf<(typeof ListSchemas)["/list/update"]["params"]>;
    body: ZodTypeOf<(typeof ListSchemas)["/list/update"]["body"]>;
    formdata: ZodTypeOf<(typeof ListSchemas)["/list/update"]["formdata"]>;
    response: ResponseBodyType<Prisma.ListGetPayload<object>>;
  };
  "/list/create": {
    body: ZodTypeOf<(typeof ListSchemas)["/list/create"]["body"]>;
    response: ResponseBodyType<Prisma.ListGetPayload<object>>;
  };
  "/list/delete": {
    params: ZodTypeOf<(typeof ListSchemas)["/list/delete"]["params"]>;
    response: null;
  };
  "/list/getAllByUserId": {
    params: ZodTypeOf<(typeof ListSchemas)["/list/getAllByUserId"]["params"]>;
    response: ResponseBodyType<
      Prisma.ListGetPayload<{
        select: {
          id: true;
          name: true;
          cloudinaryImage: {
            select: {
              publicId: true;
              version: true;
            };
          };
        };
      }>[]
    >;
  };
};
