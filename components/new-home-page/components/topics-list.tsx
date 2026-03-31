import { topicsList } from "@/domain/topic/topic.constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function TopicsList() {
  const searchParams = useSearchParams();
  const activeTopic = searchParams.get("topic");

  return (
    <section className="flex gap-12 overflow-x-auto flex-nowrap">
      {topicsList.map((topic) => {
        const isActive = activeTopic === topic.type;
        return (
          <Link
            href={`/?topic=${topic.type}`}
            className={cn(
              `pb-2 rounded-none hover:text-rose-500 whitespace-nowrap transition-all`,
              isActive
                ? "text-rose-500 border-rose-500 border-b-2"
                : "text-gray-600 "
            )}
            key={topic.type}
          >
            {topic.title}
          </Link>
        );
      })}
    </section>
  );
}
