import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/ui/icons.v2";
import { TopicType } from "@/domain/topic/topic.types";

const TOPIC_LABELS: Record<TopicType, string> = {
  recommendation: "推荐",
  storytelling: "故事",
  news: "新闻",
  "chinese-classics": "经典",
  history: "历史",
  technology: "科技",
  science: "科学",
  lifestyle: "生活",
  travel: "旅行",
  music: "音乐",
  "personal-growth": "成长",
  business: "商业",
  politics: "政治",
  innovation: "创新",
  kids: "儿童",
  sports: "运动",
};

interface StepSummaryProps {
  seriesData: {
    title: string;
    description: string;
    topicType: string;
    sourceId: string;
    sourceName: string;
    photoUrl: string;
  };
}

export function StepSummary({ seriesData }: StepSummaryProps) {
  return (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 dark:bg-[rgb(11,12,13)] dark:border-gray-800">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          在创建系列之前，请审阅以下所有信息。
          如有需要，您可以返回编辑任何部分。
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-8 space-y-6 dark:bg-[rgb(11,12,13)] dark:border-gray-800">
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0 mt-1 dark:bg-rose-950/30">
              <Icons.book className="h-5 w-5 text-rose-500" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm text-gray-600 mb-1 dark:text-gray-400">
                标题
              </h3>
              <p className="text-base font-medium text-gray-900 dark:text-gray-100">
                {seriesData.title}
              </p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 dark:border-gray-800">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0 mt-1 dark:bg-rose-950/30">
                <Icons.paragraph className="h-5 w-5 text-rose-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-gray-600 mb-1 dark:text-gray-400">
                  描述
                </h3>
                <p className="text-base leading-relaxed text-gray-900 dark:text-gray-100">
                  {seriesData.description}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 dark:border-gray-800">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0 mt-1 dark:bg-rose-950/30">
                <Icons.mandarin className="h-5 w-5 text-rose-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-gray-600 mb-1 dark:text-gray-400">
                  主题类型
                </h3>
                <Badge
                  variant="secondary"
                  className="text-sm bg-rose-50 text-rose-700 hover:bg-rose-100 dark:bg-rose-950/30 dark:text-rose-400"
                >
                  {TOPIC_LABELS[seriesData.topicType as TopicType] ||
                    seriesData.topicType}
                </Badge>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 dark:border-gray-800">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0 mt-1 dark:bg-rose-950/30">
                <Icons.userSolid className="h-5 w-5 text-rose-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-gray-600 mb-1 dark:text-gray-400">
                  来源
                </h3>
                <p className="text-base font-medium text-gray-900 dark:text-gray-100">
                  {seriesData.sourceName}
                </p>
              </div>
            </div>
          </div>

          {seriesData.photoUrl && (
            <div className="border-t border-gray-200 pt-6 dark:border-gray-800">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0 mt-1 dark:bg-rose-950/30">
                  <Icons.contentSolid className="h-5 w-5 text-rose-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm text-gray-600 mb-1 dark:text-gray-400">
                    封面照片
                  </h3>
                  <div className="aspect-video w-full max-w-md rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800">
                    <img
                      src={seriesData.photoUrl}
                      alt="Series cover"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 pt-6 mt-6 dark:border-gray-800">
          <div className="bg-rose-50 rounded-lg p-4 border border-rose-200 dark:bg-rose-950/20 dark:border-rose-900">
            <div className="flex items-start gap-3">
              <Icons.infoCircle className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold mb-1 text-gray-900 dark:text-gray-100">
                  准备创建？
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  点击下方的&quot;创建系列&quot;来完成您的新系列创建。您随时可以编辑这些详情。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
