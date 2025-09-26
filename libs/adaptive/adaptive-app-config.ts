import { z } from "zod";
const AdaptiveAppConfigSchema = z.object({
  apiKey: z.string().min(1, "API key is required"),
  apiUrl: z.string().url("Must be a valid URL"),
});

export const adaptiveAppConfig = AdaptiveAppConfigSchema.parse({
  apiKey: process.env.NEXT_PUBLIC_ADAPTIVE_API_KEY,
  apiUrl: process.env.NEXT_PUBLIC_ADAPTIVE_API_URL,
});

export type AdaptiveAppConfig = z.infer<typeof AdaptiveAppConfigSchema>;
