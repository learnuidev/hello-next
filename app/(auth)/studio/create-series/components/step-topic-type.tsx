import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Icons } from "@/components/ui/icons.v2";
import { TopicType } from "@/domain/topic/topic.types";

const TOPIC_TYPES: { value: TopicType; label: string; description: string }[] =
  [
    {
      value: "recommendation",
      label: "推荐",
      description: "Recommendations and curated content",
    },
    {
      value: "storytelling",
      label: "故事",
      description: "Stories and narratives",
    },
    { value: "news", label: "新闻", description: "News and current events" },
    {
      value: "chinese-classics",
      label: "经典",
      description: "Classical literature and texts",
    },
    { value: "history", label: "历史", description: "Historical content" },
    {
      value: "technology",
      label: "科技",
      description: "Technology and innovation",
    },
    { value: "science", label: "科学", description: "Science and nature" },
    {
      value: "lifestyle",
      label: "生活",
      description: "Lifestyle and daily life",
    },
    { value: "travel", label: "旅行", description: "Travel and exploration" },
    { value: "music", label: "音乐", description: "Music and arts" },
    {
      value: "personal-growth",
      label: "成长",
      description: "Personal development",
    },
    {
      value: "business",
      label: "商业",
      description: "Business and entrepreneurship",
    },
    { value: "politics", label: "政治", description: "Politics and society" },
    {
      value: "innovation",
      label: "创新",
      description: "Innovation and creativity",
    },
    { value: "kids", label: "儿童", description: "Content for children" },
    { value: "sports", label: "运动", description: "Sports and fitness" },
  ];

interface StepTopicTypeProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function StepTopicType({ value, onChange, error }: StepTopicTypeProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label
          htmlFor="topicType"
          className="text-gray-700 font-medium dark:text-gray-300"
        >
          主题类型
          <span className="text-rose-500 ml-1">*</span>
        </Label>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger
            id="topicType"
            className="h-12 text-base border-gray-200 focus:border-rose-500 focus:ring-rose-500 dark:bg-[rgb(11,12,13)] dark:border-gray-800"
          >
            <SelectValue placeholder="选择主题分类" />
          </SelectTrigger>
          <SelectContent>
            {TOPIC_TYPES.map((topic) => (
              <SelectItem
                key={topic.value}
                value={topic.value}
                className="py-3"
              >
                <div className="flex flex-col">
                  <span className="font-medium">{topic.label}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {topic.description}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {error && (
          <p className="text-sm text-rose-500 flex items-center gap-1">
            <Icons.xMark className="h-4 w-4" />
            {error}
          </p>
        )}
      </div>

      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 dark:bg-[rgb(11,12,13)] dark:border-gray-800">
        <h3 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">
          主题指南
        </h3>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li className="flex items-start gap-2">
            <Icons.lightBulbSolid className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <span>为您的系列选择最相关的分类</span>
          </li>
          <li className="flex items-start gap-2">
            <Icons.lightBulbSolid className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <span>考虑您的主要内容重点和受众</span>
          </li>
          <li className="flex items-start gap-2">
            <Icons.lightBulbSolid className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <span>需要时您可以稍后更新</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
