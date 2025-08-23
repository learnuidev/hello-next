import { useNewConvoStore } from "@/components/step";
import { Button } from "@/components/ui/button";
import { useAddContentMutation } from "@/domain/content/content.mutations";
import { removeNull } from "@/lib/utils";

import { z } from "zod";

// Base schema shared by all types
const baseSchema = z.object({
  location: z.string(),
  type: z.enum(["youtube", "video", "audio", "text"]),
  contentType: z.string(),
  lang: z.string(),
  title: z.string(),
  input: z.any(),
  author: z.string(),
});

// Specialized child schemas:
const youtubeSchema = baseSchema.extend({
  type: z.literal("youtube"),
  audio: z.string(),
  thumbnails: z.array(z.string()).optional(), // assuming array of URLs
  description: z.string(),
  transcriptions: z.any(), // could refine further if you know the structure
});

const videoSchema = baseSchema.extend({
  type: z.literal("video"),
  videoId: z.string(),
  transcriptions: z.any(),
});

const audioSchema = baseSchema.extend({
  type: z.literal("audio"),
  audioId: z.string(),
});

const textSchema = baseSchema.extend({
  type: z.literal("text"),
  input: z.string(), // ensure input is a string in this case
});

// Final discriminated union schema
export const contentSchema = z.discriminatedUnion("type", [
  youtubeSchema,
  videoSchema,
  audioSchema,
  textSchema,
]);

// Custom error map to override specific errors
const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  if (issue.code === "invalid_union_discriminator") {
    // You can include ctx.data to show the received value
    return {
      message:
        `Type is not valid. Allowed: youtube, video, audio, text. ` +
        `Received: ${ctx.data?.type ?? "unknown"}`,
    };
  }
  // Optionally handle other errors or fallback
  return { message: ctx.defaultError };
};

export function validateContentInput(data: any) {
  const { location, type, contentType, lang, title, input, author } = data;

  let mandatory: any = {
    location,
    type,
    contentType,
    lang,
    title,
    input,
    author,
  };

  if (type === "youtube") {
    mandatory.audio = data.audio;
    mandatory.thumbnails = data.thumbnails;
    mandatory.description = data.description;
    mandatory.transcriptions = data.transcriptions;
  }

  if (type === "video") {
    mandatory.videoId = data.videoId;
    mandatory.transcriptions = data.transcriptions;
  }

  if (type === "audio") {
    mandatory.audioId = data.audioId;
  }

  if (type === "text") {
    mandatory.input = data.input;
  }

  return contentSchema.safeParse(mandatory, { errorMap: customErrorMap });
}
