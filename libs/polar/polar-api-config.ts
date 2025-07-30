import { z } from "zod";

const polarApiSchema = z.object({
  accessToken: z.string(),
  server: z.enum(["production", "sandbox"]),
  successUrl: z.string().url(),

  webhookSecret: z.string(),
});

const polarInput = {
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  server: process.env.POLAR_SERVER,
  successUrl: process.env.POLAR_SUCCESS_URL,
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET,
};

// runs into error if this fails :)
export const polarApiConfig = polarApiSchema.parse(polarInput);
