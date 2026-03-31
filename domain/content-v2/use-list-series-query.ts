"use client";

import { useQuery } from "@tanstack/react-query";
import { Series } from "./series.types";
import { TopicType } from "../topic/topic.types";

export interface ListSeriesParams {
  topicType?: TopicType;
  sourceId?: string;
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
    source: {
      status: "unclaimed",
      id: "source-1",
      userName: "chinesepod",
      title: "ChinesePod",
    },
  },
  {
    id: "series-2",
    topicType: "storytelling" as TopicType,
    title: "中国古代故事",
    source: {
      status: "unclaimed",
      id: "source-2",
      userName: "storycn",
      title: "中国故事网",
    },
  },
  {
    id: "series-3",
    topicType: "news" as TopicType,
    title: "科技新闻每日",
    source: {
      status: "unclaimed",
      id: "source-3",
      userName: "techtalk",
      title: "科技日报",
    },
  },
  {
    id: "series-4",
    topicType: "chinese-classics" as TopicType,
    title: "成语故事",
    source: {
      status: "unclaimed",
      id: "source-4",
      userName: "culturecn",
      title: "国学堂",
    },
  },
  {
    id: "series-5",
    topicType: "history" as TopicType,
    title: "中国历史讲座",
    source: {
      status: "unclaimed",
      id: "source-5",
      userName: "historian",
      title: "历史研究院",
    },
  },
  {
    id: "series-6",
    topicType: "technology" as TopicType,
    title: "人工智能前沿",
    source: {
      status: "unclaimed",
      id: "source-6",
      userName: "aitalk",
      title: "AI视界",
    },
  },
  {
    id: "series-7",
    topicType: "music" as TopicType,
    title: "传统音乐欣赏",
    source: {
      status: "unclaimed",
      id: "source-7",
      userName: "musiccn",
      title: "中国音乐",
    },
  },
  {
    id: "series-8",
    topicType: "science" as TopicType,
    title: "科普读物",
    source: {
      status: "unclaimed",
      id: "source-8",
      userName: "sciencecn",
      title: "科学探索",
    },
  },
  {
    id: "series-9",
    topicType: "personal-growth" as TopicType,
    title: "个人成长励志",
    source: {
      status: "unclaimed",
      id: "source-9",
      userName: "growthcn",
      title: "成长之路",
    },
  },
  {
    id: "series-10",
    topicType: "travel" as TopicType,
    title: "旅行中国",
    source: {
      status: "unclaimed",
      id: "source-10",
      userName: "travelcn",
      title: "旅行家",
    },
  },
  {
    id: "series-11",
    topicType: "economics-and-finance" as TopicType,
    title: "财经新闻解读",
    source: {
      status: "unclaimed",
      id: "source-11",
      userName: "financecn",
      title: "财经观察",
    },
  },
  {
    id: "series-12",
    topicType: "lifestyle" as TopicType,
    title: "健康生活",
    source: {
      status: "unclaimed",
      id: "source-12",
      userName: "healthcn",
      title: "健康生活",
    },
  },
  {
    id: "series-13",
    topicType: "chinese-classics" as TopicType,
    title: "诗词鉴赏",
    source: {
      status: "unclaimed",
      id: "source-13",
      userName: "poetrycn",
      title: "诗词大会",
    },
  },
  {
    id: "series-14",
    topicType: "technology" as TopicType,
    title: "科技创新",
    source: {
      status: "unclaimed",
      id: "source-14",
      userName: "innovatecn",
      title: "创新科技",
    },
  },
  {
    id: "series-15",
    topicType: "lifestyle" as TopicType,
    title: "生活美学",
    source: {
      status: "unclaimed",
      id: "source-15",
      userName: "lifecn",
      title: "生活家",
    },
  },
  {
    id: "series-16",
    topicType: "economics-and-finance" as TopicType,
    title: "商业案例分析",
    source: {
      status: "unclaimed",
      id: "source-16",
      userName: "businesscn",
      title: "商业周刊",
    },
  },
  {
    id: "series-17",
    topicType: "news" as TopicType,
    title: "时事评论",
    source: {
      status: "unclaimed",
      id: "source-17",
      userName: "commentarycn",
      title: "评论时讯",
    },
  },
  {
    id: "series-18",
    topicType: "science" as TopicType,
    title: "自然科学探索",
    source: {
      status: "unclaimed",
      id: "source-18",
      userName: "naturecn",
      title: "自然科学",
    },
  },
  {
    id: "series-19",
    topicType: "chinese-classics" as TopicType,
    title: "艺术鉴赏",
    source: {
      status: "unclaimed",
      id: "source-19",
      userName: "artcn",
      title: "艺术殿堂",
    },
  },
  {
    id: "series-20",
    topicType: "news" as TopicType,
    title: "社会观察",
    source: {
      status: "unclaimed",
      id: "source-20",
      userName: "societync",
      title: "社会观察",
    },
  },
  {
    id: "series-21",
    topicType: "recommendation" as TopicType,
    title: "语言学习",
    source: {
      status: "unclaimed",
      id: "source-21",
      userName: "languagecn",
      title: "语言学堂",
    },
  },
  {
    id: "series-22",
    topicType: "kids" as TopicType,
    title: "儿童故事会",
    source: {
      status: "unclaimed",
      id: "source-22",
      userName: "kidscn",
      title: "儿童频道",
    },
  },
  {
    id: "series-23",
    topicType: "history" as TopicType,
    title: "历史人物",
    source: {
      status: "unclaimed",
      id: "source-23",
      userName: "historycn",
      title: "历史人物",
    },
  },
  {
    id: "series-24",
    topicType: "technology" as TopicType,
    title: "互联网趋势",
    source: {
      status: "unclaimed",
      id: "source-24",
      userName: "internetcn",
      title: "互联网观察",
    },
  },
  {
    id: "series-25",
    topicType: "travel" as TopicType,
    title: "美食之旅",
    source: {
      status: "unclaimed",
      id: "source-25",
      userName: "foodcn",
      title: "美食中国",
    },
  },
];

const mockSeries: Series[] = mockSeriesData.map((data, i) => ({
  ...data,
  stats: {
    averageRating: Math.floor(Math.random() * 50) / 10 + 3,
    totalPlays: Math.floor(Math.random() * 50000) + 1000,
    totalStars: Math.floor(Math.random() * 2000) + 100,
    totalCharacters: Math.floor(Math.random() * 10) + 500,
    totalSentences: Math.floor(Math.random() * 2) + 5,
    totalWords: Math.floor(Math.random() * 5) + 50,
  },
  backgroundImageUrl: defaultPic,
}));

const listSeriesApi = async (
  params: ListSeriesParams
): Promise<ListSeriesResponse> => {
  const {
    topicType,
    sourceId,
    limit = 10,
    direction = "desc",
    exclusiveStartKey,
  } = params;

  await new Promise((resolve) => setTimeout(resolve, 300));

  let filtered = [...mockSeries];

  if (topicType) {
    filtered = filtered.filter((series) => series.topicType === topicType);
  }

  if (sourceId) {
    filtered = filtered.filter((series) => series.source.id === sourceId);
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
