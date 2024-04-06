import {Prisma} from "@prisma/client";
import {ZodType, z} from "zod";
import {ALLOWED_HOSTNAMES, MAX_LENGTHS, rowColors} from "@/lib/constants";
import {ContentSourceType} from "@/lib/types/list.type";
import {AnilistMediaType} from "@/services/anilistApi/anilist.type";
import {ResponseBodyType} from "../response.api";
import {IsTrue, IsTypesEqual, ZodDbId, ZodTypeOf} from "../index.type.api";
import {TmdbMediaType} from "./tmdb.schema";

const ListContentSchemaBase = z
  .object({
    name: z.string().max(MAX_LENGTHS.content_name_length),
    image_url: z.string().max(400),
    source: z.enum(ContentSourceType),
    notPoster: z.boolean().optional(),
    square: z.boolean().optional(),
    tmdb: z
      .object({
        id: z.number().max(MAX_LENGTHS.max_num_id),
        media_type: z.enum(TmdbMediaType),
      })
      .optional()
      .nullable(),
    anilist: z
      .object({
        id: z.number().max(MAX_LENGTHS.max_num_id),
        type: z.enum(AnilistMediaType),
      })
      .optional()
      .nullable(),
    igdb: z
      .object({
        id: z.number().max(MAX_LENGTHS.max_num_id),
      })
      .optional()
      .nullable(),
    wikipedia: z
      .object({
        id: z.number().max(MAX_LENGTHS.max_num_id),
      })
      .optional()
      .nullable(),
    clearbit: z
      .object({
        id: z.string().max(100),
      })
      .optional()
      .nullable(),
    text: z
      .object({
        id: z.string().max(MAX_LENGTHS.fe_generated_id),
      })
      .optional()
      .nullable(),
  })
  .strict();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type _ZodContentEqualsPrisma_ = IsTrue<
  IsTypesEqual<z.infer<typeof ListContentSchemaBase>, PrismaJson.ContentType>
>;

const ListContentSchema = ListContentSchemaBase.superRefine((data, ctx) => {
  let isAllowed = false;

  if (data.source === "text" && data.image_url === "") {
    isAllowed = true;
  } else {
    isAllowed = ALLOWED_HOSTNAMES.some((allowedURL) => {
      return data.image_url.startsWith(`https://${allowedURL}`);
    });
  }

  if (!isAllowed) {
    ctx.addIssue({
      code: "custom",
      message: `Incorrect content image_url source. Name: '${data.name.slice(0, 10)}${data.name.length > 10 ? "..." : ""}`,
    });
  }

  const presentSources = ContentSourceType.filter((source) => data[source] !== undefined);
  if (presentSources.length !== 1) {
    ctx.addIssue({
      code: "custom",
      message: `Only one source detail object is allowed. Name: '${data.name.slice(0, 10)}${data.name.length > 10 ? "..." : ""}'`,
    });
  }

  if (presentSources[0] !== data.source) {
    ctx.addIssue({
      code: "custom",
      message: "Given source detail object doesn't match with source value",
    });
  }
});

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

const ListObjectRowsStorage = z
  .object({
    rows: z.array(
      z.object({
        name: z.string().max(MAX_LENGTHS.list_title),
        color: z.enum(rowColors),
        row_id: z.string().max(MAX_LENGTHS.fe_generated_id),
        contents: z.array(ListContentSchema),
      }),
    ),
    storage: z.array(ListContentSchema),
  })
  .superRefine((data, ctx) => {
    let totalContents = 0;

    data.rows.forEach((row) => {
      totalContents += row.contents.length;
    });

    totalContents += data.storage.length;

    if (totalContents > MAX_LENGTHS.max_contents) {
      ctx.addIssue({
        code: "custom",
        message: "Max contents length reached",
      });
    }

    if (data.rows.length > MAX_LENGTHS.max_rows) {
      ctx.addIssue({
        code: "custom",
        message: "Max rows length reached",
      });
    }
  });

const ListObjectName = z.object({
  name: z.string().max(MAX_LENGTHS.list_title),
});

const ListObjectSchema = ListObjectName.and(ListObjectRowsStorage) satisfies ZodType<{
  name: string;
  rows: PrismaJson.RowsType[];
  storage: PrismaJson.ContentType[];
}>;

const ListUpdateSchema = z.object({
  body: ListObjectSchema.optional(),
  image: ImageSchema.optional(),
  deleteImage: z.boolean().optional(),
  imageContents: z.string().max(MAX_LENGTHS.image_contents).optional(),
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
    formdata: ListObjectName.or(
      z.object({
        copyListId: ZodDbId,
        contentsData: ListObjectRowsStorage,
        image: ImageSchema,
        imageContents: z.string().max(MAX_LENGTHS.image_contents).optional(),
      }),
    ),
  },
  "/list/delete": {
    params: z.object({
      id: ZodDbId,
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
