export const storageBuckets = {
  media: "media",
} as const;

export type StorageBucket = keyof typeof storageBuckets;
