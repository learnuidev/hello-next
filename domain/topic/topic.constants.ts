import { Topic } from "./topic.types";

interface TopicWithVisibility extends Topic {
  isVisible: boolean;
}

export const baseTopics: Pick<
  TopicWithVisibility,
  "type" | "title" | "isVisible"
>[] = [
  { isVisible: true, type: "recommendation", title: "推荐" },
  { isVisible: true, type: "kids", title: "儿童" },
  { isVisible: false, type: "storytelling", title: "有声图书" },
  { isVisible: true, type: "novel", title: "小说" },
  { isVisible: true, type: "news", title: "新闻" },
  { isVisible: true, type: "music", title: "音乐" },
  { isVisible: false, type: "sports", title: "体育" },
  { isVisible: true, type: "chinese-classics", title: "人文国学" },
  { isVisible: true, type: "history", title: "历史" },
  { isVisible: false, type: "technology", title: "科技" },
  { isVisible: false, type: "science", title: "科学" },
  { isVisible: false, type: "personal-growth", title: "个人成长" },
  { isVisible: true, type: "travel", title: "旅行" },
  { isVisible: false, type: "business", title: "商业" },
  { isVisible: true, type: "innovation", title: "创新" },
  { isVisible: true, type: "politics", title: "政治" },
  { isVisible: true, type: "lifestyle", title: "情感生活" },
];

export const topicsList: TopicWithVisibility[] = baseTopics
  .map(
    (partial) =>
      ({ ...partial, isVisible: partial.isVisible }) as TopicWithVisibility,
  )
  .filter((item) => item.isVisible);
