export const AnilistMediaType = ["anime", "manga", "character"] as const;
export type AnilistMediaType = (typeof AnilistMediaType)[number];
