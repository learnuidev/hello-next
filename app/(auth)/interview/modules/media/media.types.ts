import { z } from "zod";

export const GridBankMediaStatuses = z.enum([
  "APPROVED",
  "PENDING",
  "REJECTED",
]);

export const CreatorSchema = z.object({
  creator_id: z.string(),
  username: z.string(),
  url_image: z.string().nullable(),
  bio: z.string().nullable(),
});

export const GridBankMediaContentSchema = z.object({
  video_id: z.string(),
  url_video_watermark: z.string(),
  url_image_watermark: z.string(),
  create_timestamp: z.number(),
  status: GridBankMediaStatuses,
  is_featured: z.boolean(),
  content_tier: z.number(),
  title: z.string(),
  Municipality: z.string().nullable(),
  Region: z.string().nullable(),
  loc_description: z.string().nullable(),
  creator: CreatorSchema,
  bookmarked: z.boolean().optional(),
});

export type GridBankMediaContent = z.infer<typeof GridBankMediaContentSchema>;
export type Creator = z.infer<typeof CreatorSchema>;
