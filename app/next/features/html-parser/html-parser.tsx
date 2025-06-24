"use client";

import { useRouter } from "next/navigation";

import { useGetNextParams } from "../../hooks/use-get-next-params";
import { HtmlAnalyticsView } from "./components/html-analytics-view";
import { HtmlArticleView } from "./components/html-article-view";
import { HtmlHistoryView } from "./components/html-history-view";
import { useFeatureContext } from "../feature-context-provider";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/icons.v2";

export const HtmlParserInner = () => {
  const { url, view } = useGetNextParams();

  if (view === "analytics") {
    return <HtmlAnalyticsView />;
  }

  if (view === "history") {
    return <HtmlHistoryView />;
  }

  return <HtmlArticleView />;
};

export const HtmlParser = () => {
  const { url, view, title } = useGetNextParams();

  const { rootUrl } = useFeatureContext();
  const router = useRouter();

  return (
    <div className="relative">
      <div className="fixed bottom-0 bg-black w-full">
        <div className="space-x-8 flex justify-center items-center pt-4">
          <button
            className={cn(
              view === "history" ? "text-white" : "text-gray-400",
              "transition"
            )}
            onClick={() => {
              router.push(
                `${rootUrl}?feature-id=html-parser&url=${url}&view=history`
              );
            }}
          >
            {view === "history" ? (
              <Icons.verticalStackSolid className="text-2xl" />
            ) : (
              <Icons.verticalStack className="text-2xl" />
            )}
          </button>
          <button
            className={cn(
              view === "default" ? "text-white" : "text-gray-400",
              "transition"
            )}
            onClick={() => {
              router.push(
                `${rootUrl}?feature-id=html-parser&url=${url}&view=default`
              );
            }}
          >
            {view === "default" ? (
              <Icons.mandarinSolid className="text-2xl" />
            ) : (
              <Icons.mandarin className="text-2xl" />
            )}
          </button>
          <button
            className={cn(
              view === "analytics" ? "text-white" : "text-gray-400",
              "transition"
            )}
            onClick={() => {
              router.push(
                `${rootUrl}?feature-id=html-parser&url=${url}&view=analytics`
              );
            }}
          >
            {view === "analytics" ? (
              <Icons.chartColumnSolid className="text-2xl" />
            ) : (
              <Icons.chartColumn className="text-2xl" />
            )}
          </button>
        </div>
      </div>

      <HtmlParserInner />
    </div>
  );
};
