/**
 * YouTube's 4:3 thumbnail sizes (`default`, `hqdefault`, `sddefault`) bake black
 * letterbox bars into the pixels: the 16:9 frame is centred inside a 4:3 canvas.
 * Squeezing one of those into a square cover keeps the bars, so the image reads
 * as a wide strip in a black frame — very obvious against a dark background.
 *
 * `mqdefault` is the same frame at 16:9 with the bars already cropped away, and
 * every public video has it, so rewrite to that when we recognise the pattern.
 * Uploaded/S3 covers and any other URL are returned untouched.
 */
const LETTERBOXED_YOUTUBE_THUMBNAIL =
  /\/(default|hqdefault|sddefault)\.(jpg|jpeg|webp|png)(\?.*)?$/i;

export function toWidescreenThumbnailUrl(url?: string | null) {
  if (!url) return url;

  return url.replace(LETTERBOXED_YOUTUBE_THUMBNAIL, "/mqdefault.$2$3");
}
