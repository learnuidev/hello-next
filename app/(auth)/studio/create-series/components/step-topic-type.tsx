import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons.v2";
import { TopicType } from "@/domain/topic/topic.types";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { baseTopics, topicsList } from "@/domain/topic/topic.constants";

interface StepTopicTypeProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function StepTopicType({ value, onChange, error }: StepTopicTypeProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-gray-700 font-medium dark:text-gray-300">
          主题类型
          <span className="text-rose-500 ml-1">*</span>
        </Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {topicsList.map((topic) => {
            const isSelected = value === topic.type;
            return (
              <motion.button
                key={topic.type}
                onClick={() => {
                  if (isSelected) {
                    onChange("");
                  } else {
                    onChange(topic.type);
                  }
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all",
                  isSelected
                    ? "border-rose-500 bg-rose-50 text-rose-700 dark:bg-rose-950/20 dark:text-rose-400"
                    : "border-gray-200 hover:border-rose-500 hover:bg-rose-50/50 dark:border-gray-800 dark:hover:border-rose-500 dark:hover:bg-rose-950/10",
                )}
              >
                <span className="font-semibold text-lg">{topic.title}</span>
              </motion.button>
            );
          })}
        </div>
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
