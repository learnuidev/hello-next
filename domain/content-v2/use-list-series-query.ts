"use client";

import { useQuery } from "@tanstack/react-query";
import { Series } from "./series.types";
import { TopicType } from "../topic/topic.types";

export interface ListSeriesParams {
  topicType?: TopicType;
  sourceUsername?: string;
  limit?: number;
  direction?: "asc" | "desc";
  exclusiveStartKey?: string;
}

const defaultPic = `https://nomadmethod-api-dev-assetsbucket-2u2iqsv5nizc.s3.amazonaws.com/01K3WRT0WY9NFBA55Y1DWYJ4MG.png`;

export interface ListSeriesResponse {
  items: Series[];
  pagination: {
    direction: "asc" | "desc";
    limit: number;
    hasMore: boolean;
    nextToken: string | null;
  };
}

const mockSeries: Series[] = Array.from({ length: 25 }, (_, i) => ({
  id: `series-${i + 1}`,
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
  title: `Series ${i + 1}`,
  source: {
    id: `source-${(i % 5) + 1}`,
    username: ["user1", "user2", "user3", "user4", "user5"][i % 5],
    title: `Source ${(i % 5) + 1}`,
  },
  stats: {
    averageRating: Math.floor(Math.random() * 50) / 10 + 3,
    totalPlays: Math.floor(Math.random() * 10000),
    totalStars: Math.floor(Math.random() * 500),
  },
  backgroundImage: defaultPic,
}));

const listSeriesApi = async (
  params: ListSeriesParams
): Promise<ListSeriesResponse> => {
  const {
    topicType,
    sourceUsername,
    limit = 10,
    direction = "desc",
    exclusiveStartKey,
  } = params;

  await new Promise((resolve) => setTimeout(resolve, 300));

  let filtered = [...mockSeries];

  if (topicType) {
    filtered = filtered.filter((series) => series.topicType === topicType);
  }

  if (sourceUsername) {
    filtered = filtered.filter(
      (series) => series.source.username === sourceUsername
    );
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

export function useListSeriesQuery(params: ListSeriesParams = {}) {
  return useQuery({
    queryKey: [
      "list-series",
      ...Object.entries(params).filter(([_, v]) => v != null),
    ],
    queryFn: () => listSeriesApi(params),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
