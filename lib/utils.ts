import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

export function getUrlFromString(str: string) {
  if (isValidUrl(str)) return str;
  try {
    if (str.includes(".") && !str.includes(" ")) {
      return new URL(`https://${str}`).toString();
    }
  } catch (e) {
    return null;
  }
}

// @ts-ignore
export function parseTranscripts(res) {
  // @ts-ignore
  return res.transcript.segments.map((segment, idx) => {
    return {
      start: segment.start,
      step: idx + 1,
      end: segment.end,
      seek: segment.seek,
      hanzi: segment.text,
    };
  });
}
