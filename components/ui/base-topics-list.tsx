import { topicsList } from "@/domain/topic/topic.constants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { TopicType } from "@/domain/topic/topic.types";

export interface TopicsListProps {
  activeTopic: TopicType | null;
  onTopicClick: (topicType: TopicType) => void;
  layoutId?: string;
  variant?: "link" | "button";
  animate?: boolean;
  className?: string;
  buttonClassName?: string;
}

export function BaseTopicsList({
  activeTopic,
  onTopicClick,
  layoutId = "activeTopic",
  variant = "link",
  animate = false,
  className,
  buttonClassName,
}: TopicsListProps) {
  return (
    <section
      className={cn("flex gap-12 overflow-x-auto flex-nowrap", className)}
    >
      {topicsList.map((topic, index) => {
        const isActive = activeTopic === topic.type;
        return (
          <motion.div
            key={topic.type}
            initial={animate ? { opacity: 0, x: -20 } : false}
            animate={{ opacity: 1, x: 0 }}
            transition={animate ? { delay: index * 0.1 } : {}}
          >
            {variant === "link" ? (
              <a
                href={`/?topic=${topic.type}`}
                onClick={(e) => {
                  e.preventDefault();
                  onTopicClick(topic.type);
                }}
                className={cn(
                  `pb-2 text-lg sm:text-md rounded-none hover:text-rose-500 whitespace-nowrap transition-all relative`,
                  isActive ? "text-rose-500" : "text-gray-600",
                  buttonClassName
                )}
              >
                {topic.title}
                {isActive && (
                  <motion.div
                    layoutId={layoutId}
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-500"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </a>
            ) : (
              <button
                onClick={() => {
                  onTopicClick(topic.type);
                }}
                className={cn(
                  `pb-2 rounded-none hover:text-rose-500 whitespace-nowrap transition-all relative`,
                  isActive ? "text-rose-500" : "text-gray-600",
                  buttonClassName
                )}
              >
                {topic.title}
                {isActive && (
                  <motion.div
                    layoutId={layoutId}
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-500"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            )}
          </motion.div>
        );
      })}
    </section>
  );
}
