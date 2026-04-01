import { z } from "zod";

export const seriesSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .min(1, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters"),
  topicType: z.string().min(1, "Topic type is required"),
  sourceId: z.string().min(1, "Source is required"),
  sourceName: z.string().optional(),
  photoAssetId: z.string().optional(),
  photoUrl: z.string().optional(),
});

export type SeriesFormData = z.infer<typeof seriesSchema>;
