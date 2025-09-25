import { z } from "zod";
const DataFastAppConfigSchema = z.object({
  apiKey: z.string().min(1, "API key is required"),
  apiUrl: z.string().url("Must be a valid URL"),
});

export const dataFastAppConfig = DataFastAppConfigSchema.parse({
  apiKey: process.env.NEXT_PUBLIC_DATAFAST_API_KEY,
  apiUrl: process.env.NEXT_PUBLIC_DATAFAST_API_URL,
});

export type DataFastAppConfig = z.infer<typeof DataFastAppConfigSchema>;
