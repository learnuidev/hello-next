import { ListCorrectionsResponse } from "./types";

export type CacheEntry = {
  content: string;
  timestamp: Date;
  response: ListCorrectionsResponse;
};

export const normalizeContent = (content: string): string => {
  return content
    .replace(/\s+/g, " ") // Replace multiple whitespace with single space
    .replace(/\n\s*\n/g, "\n\n") // Normalize multiple line breaks
    .trim(); // Remove leading/trailing whitespace
};

export const shouldAnalyzeContent = (content: string): boolean => {
  const normalized = normalizeContent(content);
  // Only analyze if there are at least 5 words (lowered from 10)
  return (
    normalized.split(/\s+/).filter((word) => word.length > 0).length >= 5
  );
};

export const getCachedCorrection = (
  content: string,
  contentCache: CacheEntry[]
): ListCorrectionsResponse | null => {
  // Use exact match first for better precision
  const now = new Date();
  const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes cache TTL

  // First check for exact match
  for (const entry of contentCache) {
    if (
      entry.content === content &&
      now.getTime() - entry.timestamp.getTime() < CACHE_TTL_MS
    ) {
      return entry.response;
    }
  }

  // Then check for normalized match only if exact match not found
  const normalized = normalizeContent(content);
  for (const entry of contentCache) {
    if (
      normalizeContent(entry.content) === normalized &&
      now.getTime() - entry.timestamp.getTime() < CACHE_TTL_MS
    ) {
      return entry.response;
    }
  }

  return null;
};

export const addToCache = (
  content: string,
  response: ListCorrectionsResponse,
  contentCache: CacheEntry[]
): CacheEntry[] => {
  return [
    { content, timestamp: new Date(), response },
    // Keep only last 10 cached entries to prevent memory bloat
    ...contentCache.slice(0, 9),
  ];
};
