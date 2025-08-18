import { SafeParseReturnType, z } from "zod";

// Custom validator for YouTube video URLs
const youtubeUrlSchema = z.string().refine(
  (url) => {
    // Basic regex to check YouTube video URL formats (youtube.com/watch?v= or youtu.be/)
    const youtubeRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]{11}(&.*)?$/;
    return youtubeRegex.test(url);
  },
  {
    message: "Invalid YouTube video URL",
  }
);

/**
 * Normalizes a YouTube URL to the standard watch format, preserving only the video ID ('v')
 * and optional start time ('t') parameters.
 *
 * - If the input URL is not a valid YouTube watch URL (i.e., missing 'v'),
 *   or if parsing fails, the original URL is returned.
 * - Example:
 *     Input:  "https://www.youtube.com/watch?v=abc123&t=42s&feature=youtu.be"
 *     Output: "https://www.youtube.com/watch?v=abc123&t=42s"
 *
 * @param rawYoutubeUrl The original YouTube URL to normalize.
 * @returns The normalized YouTube watch URL, or the original string if invalid.
 */
export function normalizeYoutubeUrl(rawYoutubeUrl: string): string {
  try {
    const url = new URL(rawYoutubeUrl);

    // Only keep 'v' and 't' parameters
    const params = new URLSearchParams();
    const videoId = url.searchParams.get("v");
    if (!videoId) {
      return rawYoutubeUrl; // Not a valid YouTube watch URL
    }

    params.set("v", videoId);

    const time = url.searchParams.get("t");

    if (time) {
      params.set("t", time);
    }

    return `https://www.youtube.com/watch?${params.toString()}`;
  } catch {
    return rawYoutubeUrl;
  }
}

/**
 * Parses and validates a YouTube URL.
 *
 * @param src The input string to validate and normalize as a YouTube URL.
 * @returns A Zod SafeParseReturnType containing either the normalized YouTube URL (if valid) or an error.
 */
export function parseYoutubeUrl(
  src: string
): SafeParseReturnType<string, string> {
  return youtubeUrlSchema.safeParse(normalizeYoutubeUrl(src));
}

export function extractYoutubeVideoIdAndTime(rawYoutubeUrl: string) {
  try {
    const url = new URL(rawYoutubeUrl);

    const videoId = url.searchParams.get("v");
    const time = url.searchParams.get("t");

    return {
      videoId,
      time,
    };
  } catch {
    return {
      videoId: null,
      time: null,
    };
  }
}
