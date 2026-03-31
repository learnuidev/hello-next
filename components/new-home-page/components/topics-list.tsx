import { topicsList } from "@/domain/topic/topic.constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { TopicType } from "@/domain/topic/topic.types";

export function TopicsList({
  activeTopic,
  setActiveTopic,
}: {
  activeTopic: TopicType;
  setActiveTopic: (topicType: TopicType) => void;
}) {
  return (
    <section className="flex gap-12 overflow-x-auto flex-nowrap">
      {topicsList.map((topic, index) => {
        const isActive = activeTopic === topic.type;
        return (
          <motion.div
            key={topic.type}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              href={`/?topic=${topic.type}`}
              onClick={() => {
                setActiveTopic(topic.type);
              }}
              className={cn(
                `pb-2 rounded-none hover:text-rose-500 whitespace-nowrap transition-all relative`,
                isActive ? "text-rose-500" : "text-gray-600"
              )}
            >
              {topic.title}
              {isActive && (
                <motion.div
                  layoutId="activeTopic"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-500"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          </motion.div>
        );
      })}
    </section>
  );
}
