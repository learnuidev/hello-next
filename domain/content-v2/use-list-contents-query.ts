"use client";

import { useQuery } from "@tanstack/react-query";
import { ContentV2, ContentV2Type, ContentFormat } from "./content-v2.types";
import { TopicType } from "../topic/topic.types";

export interface ListContentsParams {
  topicType?: TopicType;
  limit?: number;
  direction?: "asc" | "desc";
  exclusiveStartKey?: string;
}

export interface ListContentsResponse {
  items: ContentV2[];
  pagination: {
    direction: "asc" | "desc";
    limit: number;
    hasMore: boolean;
    nextToken: string | null;
  };
}

const mockContents: ContentV2[] = Array.from({ length: 25 }, (_, i) => ({
  id: `content-${i + 1}`,
  topicType: [
    "recommendation",
    "kids",
    "storytelling",
    "news",
    "music",
    "sports",
    "chinese-classics",
    "history",
    "technology",
    "science",
  ][i % 10] as TopicType,
  contentFormat: i % 2 === 0 ? ContentFormat.YOUTUBE : ContentFormat.AUDIO,
  contentV2Type: [
    ContentV2Type.YOUTUBE,
    ContentV2Type.AUDIO,
    ContentV2Type.TEXT,
    ContentV2Type.WEBSITE,
  ][i % 4],
  title: `Content ${i + 1}`,
  mediaUrl: `https://example.com/media${i + 1}.mp3`,
  thumbnailUrl: `https://example.com/thumb${i + 1}.jpg`,
  createdAt: Date.now() - i * 86400000,
  updatedAt: Date.now() - i * 86400000,
  stats: {
    averageRating: Math.floor(Math.random() * 50) / 10 + 3,
    totalPlays: Math.floor(Math.random() * 10000),
    totalStars: Math.floor(Math.random() * 500),
  },
}));

const listContentsApi = async (
  params: ListContentsParams
): Promise<ListContentsResponse> => {
  const { topicType, limit = 10, direction = "desc", exclusiveStartKey } = params;

  await new Promise((resolve) => setTimeout(resolve, 300));

  let filtered = [...mockContents];

  if (topicType) {
    filtered = filtered.filter((content) => content.topicType === topicType);
  }

  const startIndex = exclusiveStartKey ? parseInt(exclusiveStartKey, 10) : 0;
  const paginated = filtered.slice(startIndex, startIndex + limit);
  const hasMore = startIndex + limit < filtered.length;
  const nextToken = hasMore ? String(startIndex + limit) : null;

  return {
    items: paginated,
    pagination: {
      direction,
      limit,
      hasMore,
      nextToken,
    },
  };
};

export function useListContentsQuery(params: ListContentsParams = {}) {
  return useQuery({
    queryKey: ["list-contents", ...Object.entries(params).filter(([_, v]) => v != null)],
    queryFn: () => listContentsApi(params),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
