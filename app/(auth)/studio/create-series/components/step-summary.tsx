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
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <p className="text-sm text-gray-600">
          Please review all the information below before creating your series.
          You can go back to edit any section if needed.
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-8 space-y-6">
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0 mt-1">
              <Icons.book className="h-5 w-5 text-rose-500" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm text-gray-600 mb-1">
                Title
              </h3>
              <p className="text-base font-medium text-gray-900">{seriesData.title}</p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0 mt-1">
                <Icons.paragraph className="h-5 w-5 text-rose-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-gray-600 mb-1">
                  Description
                </h3>
                <p className="text-base leading-relaxed text-gray-900">
                  {seriesData.description}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0 mt-1">
                <Icons.mandarin className="h-5 w-5 text-rose-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-gray-600 mb-1">
                  Topic Type
                </h3>
                <Badge variant="secondary" className="text-sm bg-rose-50 text-rose-700 hover:bg-rose-100">
                  {TOPIC_LABELS[seriesData.topicType as TopicType] ||
                    seriesData.topicType}
                </Badge>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0 mt-1">
                <Icons.userSolid className="h-5 w-5 text-rose-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-gray-600 mb-1">
                  Source
                </h3>
                <p className="text-base font-medium text-gray-900">{seriesData.sourceName}</p>
              </div>
            </div>
          </div>

          {seriesData.photoUrl && (
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <Icons.contentSolid className="h-5 w-5 text-rose-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm text-gray-600 mb-1">
                    Cover Photo
                  </h3>
                  <div className="aspect-video w-full max-w-md rounded-lg overflow-hidden border border-gray-200">
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

        <div className="border-t border-gray-200 pt-6 mt-6">
          <div className="bg-rose-50 rounded-lg p-4 border border-rose-200">
            <div className="flex items-start gap-3">
              <Icons.infoCircle className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold mb-1 text-gray-900">Ready to create?</h4>
                <p className="text-sm text-gray-600">
                  Click &quot;Create Series&quot; below to finalize your new series. You
                  can always edit these details later.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
