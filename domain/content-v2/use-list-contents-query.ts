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

const defaultThumbnail = `https://nomadmethod-api-dev-assetsbucket-2u2iqsv5nizc.s3.amazonaws.com/01K3WRT0WY9NFBA55Y1DWYJ4MG.png`;

const mockContentsData = [
  {
    id: "content-1",
    topicType: "chinese-classics" as TopicType,
    title: "中国传统文化概述",
    contentFormat: ContentFormat.AUDIO,
    contentV2Type: ContentV2Type.AUDIO,
  },
  {
    id: "content-2",
    topicType: "technology" as TopicType,
    title: "人工智能在医疗领域的应用",
    contentFormat: ContentFormat.YOUTUBE,
    contentV2Type: ContentV2Type.YOUTUBE,
  },
  {
    id: "content-3",
    topicType: "recommendation" as TopicType,
    title: "普通话发音技巧",
    contentFormat: ContentFormat.AUDIO,
    contentV2Type: ContentV2Type.AUDIO,
  },
  {
    id: "content-4",
    topicType: "lifestyle" as TopicType,
    title: "中国茶文化",
    contentFormat: ContentFormat.YOUTUBE,
    contentV2Type: ContentV2Type.YOUTUBE,
  },
  {
    id: "content-5",
    topicType: "economics-and-finance" as TopicType,
    title: "2024年经济趋势分析",
    contentFormat: ContentFormat.AUDIO,
    contentV2Type: ContentV2Type.AUDIO,
  },
  {
    id: "content-6",
    topicType: "chinese-classics" as TopicType,
    title: "古代诗词赏析：李白",
    contentFormat: ContentFormat.YOUTUBE,
    contentV2Type: ContentV2Type.YOUTUBE,
  },
  {
    id: "content-7",
    topicType: "science" as TopicType,
    title: "量子物理入门",
    contentFormat: ContentFormat.AUDIO,
    contentV2Type: ContentV2Type.AUDIO,
  },
  {
    id: "content-8",
    topicType: "travel" as TopicType,
    title: "中国旅游推荐：西安",
    contentFormat: ContentFormat.YOUTUBE,
    contentV2Type: ContentV2Type.YOUTUBE,
  },
  {
    id: "content-9",
    topicType: "lifestyle" as TopicType,
    title: "健康生活方式建议",
    contentFormat: ContentFormat.AUDIO,
    contentV2Type: ContentV2Type.AUDIO,
  },
  {
    id: "content-10",
    topicType: "economics-and-finance" as TopicType,
    title: "商业谈判技巧",
    contentFormat: ContentFormat.YOUTUBE,
    contentV2Type: ContentV2Type.YOUTUBE,
  },
  {
    id: "content-11",
    topicType: "chinese-classics" as TopicType,
    title: "现代艺术发展",
    contentFormat: ContentFormat.AUDIO,
    contentV2Type: ContentV2Type.AUDIO,
  },
  {
    id: "content-12",
    topicType: "news" as TopicType,
    title: "时事热点评论",
    contentFormat: ContentFormat.YOUTUBE,
    contentV2Type: ContentV2Type.YOUTUBE,
  },
  {
    id: "content-13",
    topicType: "science" as TopicType,
    title: "自然科学探索：深海",
    contentFormat: ContentFormat.AUDIO,
    contentV2Type: ContentV2Type.AUDIO,
  },
  {
    id: "content-14",
    topicType: "lifestyle" as TopicType,
    title: "中国烹饪艺术",
    contentFormat: ContentFormat.YOUTUBE,
    contentV2Type: ContentV2Type.YOUTUBE,
  },
  {
    id: "content-15",
    topicType: "recommendation" as TopicType,
    title: "语言学习方法",
    contentFormat: ContentFormat.AUDIO,
    contentV2Type: ContentV2Type.AUDIO,
  },
  {
    id: "content-16",
    topicType: "kids" as TopicType,
    title: "儿童教育理念",
    contentFormat: ContentFormat.YOUTUBE,
    contentV2Type: ContentV2Type.YOUTUBE,
  },
  {
    id: "content-17",
    topicType: "history" as TopicType,
    title: "唐朝文化",
    contentFormat: ContentFormat.AUDIO,
    contentV2Type: ContentV2Type.AUDIO,
  },
  {
    id: "content-18",
    topicType: "technology" as TopicType,
    title: "5G技术发展",
    contentFormat: ContentFormat.YOUTUBE,
    contentV2Type: ContentV2Type.YOUTUBE,
  },
  {
    id: "content-19",
    topicType: "science" as TopicType,
    title: "气候变化研究",
    contentFormat: ContentFormat.AUDIO,
    contentV2Type: ContentV2Type.AUDIO,
  },
  {
    id: "content-20",
    topicType: "storytelling" as TopicType,
    title: "神话传说：嫦娥奔月",
    contentFormat: ContentFormat.YOUTUBE,
    contentV2Type: ContentV2Type.YOUTUBE,
  },
  {
    id: "content-21",
    topicType: "travel" as TopicType,
    title: "西藏之旅",
    contentFormat: ContentFormat.AUDIO,
    contentV2Type: ContentV2Type.AUDIO,
  },
  {
    id: "content-22",
    topicType: "economics-and-finance" as TopicType,
    title: "投资理财基础",
    contentFormat: ContentFormat.YOUTUBE,
    contentV2Type: ContentV2Type.YOUTUBE,
  },
  {
    id: "content-23",
    topicType: "chinese-classics" as TopicType,
    title: "书法艺术欣赏",
    contentFormat: ContentFormat.AUDIO,
    contentV2Type: ContentV2Type.AUDIO,
  },
  {
    id: "content-24",
    topicType: "technology" as TopicType,
    title: "区块链技术",
    contentFormat: ContentFormat.YOUTUBE,
    contentV2Type: ContentV2Type.YOUTUBE,
  },
  {
    id: "content-25",
    topicType: "lifestyle" as TopicType,
    title: "中医养生",
    contentFormat: ContentFormat.AUDIO,
    contentV2Type: ContentV2Type.AUDIO,
  },
];

const mockContents: ContentV2[] = mockContentsData.map((data, i) => ({
  ...data,
  mediaUrl: `https://example.com/media${i + 1}.mp3`,
  thumbnailUrl: defaultThumbnail,
  createdAt: Date.now() - i * 86400000,
  updatedAt: Date.now() - i * 86400000,
  stats: {
    averageRating: Math.floor(Math.random() * 50) / 10 + 3,
    totalPlays: Math.floor(Math.random() * 30000) + 500,
    totalStars: Math.floor(Math.random() * 1000) + 50,
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
