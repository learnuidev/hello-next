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
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <Label htmlFor="topicType" className="text-base">
          Topic Type
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger id="topicType" className="h-12 text-base">
            <SelectValue placeholder="Select a topic category" />
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
                  <span className="text-xs text-muted-foreground">
                    {topic.description}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {error && (
          <p className="text-sm text-red-500 flex items-center gap-1">
            <Icons.xMark className="h-4 w-4" />
            {error}
          </p>
        )}
      </div>

      <div className="bg-muted/50 rounded-lg p-6 border border-muted">
        <h3 className="font-semibold mb-3">Topic Guidelines</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <Icons.lightBulbSolid className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <span>Choose the most relevant category for your series</span>
          </li>
          <li className="flex items-start gap-2">
            <Icons.lightBulbSolid className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <span>Consider your primary content focus and audience</span>
          </li>
          <li className="flex items-start gap-2">
            <Icons.lightBulbSolid className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <span>You can update this later if needed</span>
          </li>
        </ul>
      </div>
    </motion.div>
  );
}
