import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function groupBy(timestamps: any, res = { 0: [] } as any, idx = 0) {
  const firstTimeStamp = timestamps?.[0];
  if (!firstTimeStamp) {
    return res;
  } else {
    const nextTimestamp = timestamps?.[1];
    if (!nextTimestamp) {
      return { ...res, [idx]: (res?.[idx] || [])?.concat(firstTimeStamp) };
    } else {
      // check the time difference
      const timeDifference = nextTimestamp.start - firstTimeStamp.end;
      if (timeDifference > 2) {
        return groupBy(
          timestamps?.slice(1),
          { ...res, [idx]: (res?.[idx] || [])?.concat(firstTimeStamp) },
          idx + 1
        );
      } else {
        return groupBy(
          timestamps?.slice(1),
          { ...res, [idx]: (res?.[idx] || [])?.concat(firstTimeStamp) },
          idx
        );
      }
    }
  }
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

export function isWebsite(url: string): boolean {
  if (!url || typeof url !== "string") return false;

  try {
    const urlObj = new URL(url);

    // Check for common web protocols
    const webProtocols = ["http:", "https:"];
    if (!webProtocols.includes(urlObj.protocol)) {
      return false;
    }

    // Check for common website domains/TLDS
    const websiteTlds = [
      ".com",
      ".org",
      ".net",
      ".edu",
      ".gov",
      ".io",
      ".co",
      ".ai",
      ".dev",
      ".app",
      ".shop",
      ".tech",
      ".info",
      ".biz",
      ".me",
      ".xyz",
      ".online",
      ".site",
      ".website",
      ".space",
      ".store",
      ".life",
      ".blog",
      ".news",
    ];

    const hostname = urlObj.hostname.toLowerCase();

    // Exclude obvious non-website patterns
    const excludedPatterns = [
      /^(localhost|127\.0\.0\.1|0\.0\.0\.0|::1)/,
      /\.(local|internal|corp|test|dev|staging)$/i,
      /^(10\.|172\.(1[6-9]|2[0-9]|3[0-1])\.|192\.168\.)/,
    ];

    if (excludedPatterns.some((pattern) => pattern.test(hostname))) {
      return false;
    }

    // Check if it looks like a website (has a valid TLD or common website pattern)
    return (
      websiteTlds.some((tld) => hostname.includes(tld)) ||
      (hostname.includes(".") &&
        !hostname.endsWith(".local") &&
        !hostname.endsWith(".internal"))
    );
  } catch (e) {
    return false;
  }
}

export const isLongText = (text: string) => text?.length > 100;

export function removeNull(obj: any) {
  // eslint-disable-next-line no-unused-vars
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => {
      if (typeof v === "number" || typeof v === "boolean") {
        return true;
      }
      return Boolean(v);
    })
  );
}

// write a function to check if a given string is a valid twitter url
// sample url: https://x.com/yuxiyou/status/1675507655618727936
export function isTwitterUrl(url: string) {
  const twitterRegex =
    /^https?:\/\/(www\.)?(twitter\.com|x\.com)\/[a-zA-Z0-9_]+\/status\/\d+$/;
  return twitterRegex.test(url);
}
