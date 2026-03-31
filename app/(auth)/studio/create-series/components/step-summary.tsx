import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Icons } from "@/components/ui/icons.v2";
import { TopicType } from "@/domain/topic/topic.types";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="bg-muted/50 rounded-lg p-4 border border-muted">
        <p className="text-sm text-muted-foreground">
          Please review all the information below before creating your series.
          You can go back to edit any section if needed.
        </p>
      </div>

      <Card className="border-2">
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                <Icons.book className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-muted-foreground mb-1">
                  Title
                </h3>
                <p className="text-base font-medium">{seriesData.title}</p>
              </div>
            </div>

            <Separator />

            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                <Icons.paragraph className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-muted-foreground mb-1">
                  Description
                </h3>
                <p className="text-base leading-relaxed">
                  {seriesData.description}
                </p>
              </div>
            </div>

            <Separator />

            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                <Icons.mandarin className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-muted-foreground mb-1">
                  Topic Type
                </h3>
                <Badge variant="secondary" className="text-sm">
                  {TOPIC_LABELS[seriesData.topicType as TopicType] ||
                    seriesData.topicType}
                </Badge>
              </div>
            </div>

            <Separator />

            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                <Icons.userSolid className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-muted-foreground mb-1">
                  Source
                </h3>
                <p className="text-base font-medium">{seriesData.sourceName}</p>
              </div>
            </div>

            {seriesData.photoUrl && (
              <>
                <Separator />
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Icons.contentSolid className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-muted-foreground mb-1">
                      Cover Photo
                    </h3>
                    <div className="aspect-video w-full max-w-md rounded-lg overflow-hidden border">
                      <img
                        src={seriesData.photoUrl}
                        alt="Series cover"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <Separator className="my-6" />

          <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
            <div className="flex items-start gap-3">
              <Icons.infoCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold mb-1">Ready to create?</h4>
                <p className="text-sm text-muted-foreground">
                  Click &quot;Create Series&quot; below to finalize your new series. You
                  can always edit these details later.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
