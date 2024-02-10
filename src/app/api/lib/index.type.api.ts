import {z} from "zod";

export type ZodTypeOf<S extends z.ZodType, R = z.infer<S>> = R;

export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type ApiSchemaType = {
  [key: string]: {
    params?: unknown;
    body?: unknown;
  };
};

export const ZodDbId = z.number({
  coerce: true,
});
