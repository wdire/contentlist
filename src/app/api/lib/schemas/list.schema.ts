import {Prisma} from "@prisma/client";
import {ZodType, z} from "zod";
import {rowColors} from "@/lib/constants";
import {ResponseBodyType} from "../response.api";
import {ZodDbId, ZodTypeOf} from "../index.type.api";

const ListContentSchema = z.object({
  name: z.string(),
  image_url: z.string(),
  source: z.enum(["TMDB"]),
  tmdb: z
    .object({
      tmdb_id: z.number(),
      tmdb_media_type: z.string(),
    })
    .optional(),
});

const ListObjectSchema: ZodType<{
  name: string;
  rows: PrismaJson.RowsType[];
  storage: PrismaJson.ContentType[];
}> = z
  .object({
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
  })
  .strict();

export const ListSchemas = {
  "/list/get": {
    params: z.object({
      id: ZodDbId,
    }),
  },
  "/list/update": {
    body: ListObjectSchema,
    params: z.object({
      id: ZodDbId,
    }),
  },
  "/list/create": {
    body: ListObjectSchema,
  },
  "/list/delete": {
    params: z.object({
      id: ZodDbId,
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
        };
      }>
    >;
  };
  "/list/getAll": {
    response: ResponseBodyType<
      Prisma.ListGetPayload<{
        select: {
          id: true;
          name: true;
        };
      }>[]
    >;
  };
  "/list/update": {
    params: ZodTypeOf<(typeof ListSchemas)["/list/update"]["params"]>;
    body: ZodTypeOf<(typeof ListSchemas)["/list/update"]["body"]>;
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
};
