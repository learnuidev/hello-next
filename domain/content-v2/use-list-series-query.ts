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

const mockSeriesData = [
  {
    id: "series-1",
    topicType: "recommendation" as TopicType,
    title: "中文播客精选",
    source: { id: "source-1", username: "chinesepod", title: "ChinesePod" },
  },
  {
    id: "series-2",
    topicType: "storytelling" as TopicType,
    title: "中国古代故事",
    source: { id: "source-2", username: "storycn", title: "中国故事网" },
  },
  {
    id: "series-3",
    topicType: "news" as TopicType,
    title: "科技新闻每日",
    source: { id: "source-3", username: "techtalk", title: "科技日报" },
  },
  {
    id: "series-4",
    topicType: "chinese-classics" as TopicType,
    title: "成语故事",
    source: { id: "source-4", username: "culturecn", title: "国学堂" },
  },
  {
    id: "series-5",
    topicType: "history" as TopicType,
    title: "中国历史讲座",
    source: { id: "source-5", username: "historian", title: "历史研究院" },
  },
  {
    id: "series-6",
    topicType: "technology" as TopicType,
    title: "人工智能前沿",
    source: { id: "source-6", username: "aitalk", title: "AI视界" },
  },
  {
    id: "series-7",
    topicType: "music" as TopicType,
    title: "传统音乐欣赏",
    source: { id: "source-7", username: "musiccn", title: "中国音乐" },
  },
  {
    id: "series-8",
    topicType: "science" as TopicType,
    title: "科普读物",
    source: { id: "source-8", username: "sciencecn", title: "科学探索" },
  },
  {
    id: "series-9",
    topicType: "personal-growth" as TopicType,
    title: "个人成长励志",
    source: { id: "source-9", username: "growthcn", title: "成长之路" },
  },
  {
    id: "series-10",
    topicType: "travel" as TopicType,
    title: "旅行中国",
    source: { id: "source-10", username: "travelcn", title: "旅行家" },
  },
  {
    id: "series-11",
    topicType: "economics-and-finance" as TopicType,
    title: "财经新闻解读",
    source: { id: "source-11", username: "financecn", title: "财经观察" },
  },
  {
    id: "series-12",
    topicType: "lifestyle" as TopicType,
    title: "健康生活",
    source: { id: "source-12", username: "healthcn", title: "健康生活" },
  },
  {
    id: "series-13",
    topicType: "chinese-classics" as TopicType,
    title: "诗词鉴赏",
    source: { id: "source-13", username: "poetrycn", title: "诗词大会" },
  },
  {
    id: "series-14",
    topicType: "technology" as TopicType,
    title: "科技创新",
    source: { id: "source-14", username: "innovatecn", title: "创新科技" },
  },
  {
    id: "series-15",
    topicType: "lifestyle" as TopicType,
    title: "生活美学",
    source: { id: "source-15", username: "lifecn", title: "生活家" },
  },
  {
    id: "series-16",
    topicType: "economics-and-finance" as TopicType,
    title: "商业案例分析",
    source: { id: "source-16", username: "businesscn", title: "商业周刊" },
  },
  {
    id: "series-17",
    topicType: "news" as TopicType,
    title: "时事评论",
    source: { id: "source-17", username: "commentarycn", title: "评论时讯" },
  },
  {
    id: "series-18",
    topicType: "science" as TopicType,
    title: "自然科学探索",
    source: { id: "source-18", username: "naturecn", title: "自然科学" },
  },
  {
    id: "series-19",
    topicType: "chinese-classics" as TopicType,
    title: "艺术鉴赏",
    source: { id: "source-19", username: "artcn", title: "艺术殿堂" },
  },
  {
    id: "series-20",
    topicType: "news" as TopicType,
    title: "社会观察",
    source: { id: "source-20", username: "societync", title: "社会观察" },
  },
  {
    id: "series-21",
    topicType: "recommendation" as TopicType,
    title: "语言学习",
    source: { id: "source-21", username: "languagecn", title: "语言学堂" },
  },
  {
    id: "series-22",
    topicType: "kids" as TopicType,
    title: "儿童故事会",
    source: { id: "source-22", username: "kidscn", title: "儿童频道" },
  },
  {
    id: "series-23",
    topicType: "history" as TopicType,
    title: "历史人物",
    source: { id: "source-23", username: "historycn", title: "历史人物" },
  },
  {
    id: "series-24",
    topicType: "technology" as TopicType,
    title: "互联网趋势",
    source: { id: "source-24", username: "internetcn", title: "互联网观察" },
  },
  {
    id: "series-25",
    topicType: "travel" as TopicType,
    title: "美食之旅",
    source: { id: "source-25", username: "foodcn", title: "美食中国" },
  },
];

const mockSeries: Series[] = mockSeriesData.map((data, i) => ({
  ...data,
  stats: {
    averageRating: Math.floor(Math.random() * 50) / 10 + 3,
    totalPlays: Math.floor(Math.random() * 50000) + 1000,
    totalStars: Math.floor(Math.random() * 2000) + 100,
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
