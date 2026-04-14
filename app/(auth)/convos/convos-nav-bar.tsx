"use client";

import { useParams, useSearchParams } from "next/navigation";

import { useConvosStore } from "@/stores/convos-store";

import { Icons } from "@/components/ui/icons.v2";
import { useIsSuperAdmin } from "@/domain/auth/auth.queries";
import { useGetContentQuery } from "@/domain/content/content.queries";

import Link from "next/link";
import { useIsContentAuthor } from "./[content-id]/hooks/use-is-content-author";
import { useUpsetContentAnalyticsHandler } from "./[content-id]/hooks/use-upsert-content-analytics-handler";

const indexOfAll = (str: any, w: any, res = [] as any): any => {
  const idx = str.indexOf(w);

  const wordLen = w.length;

  if (idx === -1) {
    return res;
  }
  const prevIndex = res[res.length - 1] ? wordLen : 0;
  const updatedRes = res.concat({
    index: idx + 1 + (prevIndex || 0) - wordLen,
  }) as any;
  return indexOfAll(str.slice(idx + 1), w, updatedRes);
};

const calcOutcome = (props: any) => {
  const { lesson, confidence, answer, expectedAnswer } = props;

  const expAns = expectedAnswer
    ?.replace(", ", "")
    ?.replace("?", "")
    ?.split("")
    ?.filter(Boolean)
    ?.join("")
    ?.split(" ")
    ?.filter((item: any) => ![", ", "？", "，"].includes(item))
    ?.join("");

  if (
    answer !== expAns?.trim() &&
    !lesson?.alternateAnswers?.includes(answer) &&
    !expAns?.includes(answer)
  ) {
    return "fail";
  }

  return "success";
};

// palette used for chart: https://flatuicolors.com/palette/cn

const options = [
  { id: "chinese", value: "ordering food" },
  { id: "ai", value: "list flashcards" },
  { id: "home-school", value: "practice now" },
  { id: "frameworks", value: "view analytics" },
  // { id: 'frameworks', value: 'I want to learn dynamodb' },
  {
    id: "professional",
    value: "I want to learn reactjs",
    tags: ["applied", "professional", "programming", "real-world"],
  },
  // { id: 'frameworks', value: 'I want to learn cloudwatch' },
  {
    id: "html",
    value: "I want to learn html",
    tags: ["html", "foundation", "template"],
  },
  {
    id: "tools",
    value: "I want to learn chrome dev tools",
    tags: ["tools", "productivity"],
  },
  {
    id: "js",
    value: "I want to learn js",
    tags: ["js", "foundation", "automation"],
  },

  {
    id: "css",
    value: "I want to learn css",
    tags: ["css", "foundation", "style sheet"],
  },
  { id: "architecture", value: "I want to learn frontend architecture" },
  // 'butter chicken recipe'
];

export const ConvosNavBar = () => {
  const removeLessonId = useConvosStore((state: any) => state?.removeConvoId);

  const setViewType = useConvosStore((state: any) => state?.setViewType);
  const searchParams = useSearchParams();

  const viewType = searchParams.get("view");

  const params = useParams() as {
    "content-id": string;
  };

  const contentId = params["content-id"];

  const { data: content } = useGetContentQuery({ contentId });

  const isAuthor = useIsContentAuthor(contentId);

  const isSuperAdmin = useIsSuperAdmin();

  const { upsertContentAnalyticsHandler } =
    useUpsetContentAnalyticsHandler(contentId);

  return (
    <div className="z-50 flex justify-between items-center w-full md:mt-2 my-2 py-2">
      <Link
        href={`/convos`}
        className="text-3xl"
        onClick={() => {
          removeLessonId();
          // router.push(`/convos`);
          upsertContentAnalyticsHandler();
        }}
      >
        <Icons.xMark />
      </Link>

      <div className="my-2 flex justify-center items-center space-x-8 text-xs md:text-md">
        <Link
          href={`/convos/${contentId}?view=listen&start=${searchParams.get("start") || 0}`}
          className={`transition ${
            !viewType || viewType === "listen"
              ? "text-black dark:text-gray-200"
              : "text-gray-200 dark:text-gray-600"
          } hover:text-black dark:hover:text-white transition text-xl`}
        >
          <Icons.musicNoteSolid />
        </Link>

        <Link
          onClick={() => {
            setViewType("dynacloze");
          }}
          href={`/convos/${contentId}?view=dynacloze${searchParams.get("start") ? `&start=${searchParams.get("start")}` : ""}`}
          className={`transition ${
            viewType === "dynacloze"
              ? "text-black dark:text-gray-200"
              : "text-gray-200 dark:text-gray-600"
          } hover:text-black dark:hover:text-white transition text-xl`}
        >
          <Icons.graduationCap />
        </Link>

        <Link
          onClick={() => {
            setViewType("speak");
          }}
          href={`/convos/${contentId}?view=speak&start=${searchParams.get("start") || 0}`}
          className={`transition ${
            viewType === "speak"
              ? "text-black dark:text-gray-200"
              : "text-gray-200 dark:text-gray-600"
          } hover:text-black dark:hover:text-white transition text-xl`}
        >
          <Icons.microphone />
        </Link>

        {content?.lang === "zh" && (
          <Link
            href={`/convos/${contentId}?view=write&start=${searchParams.get("start") || 0}`}
            onClick={() => {
              setViewType("write");
            }}
            className={`transition ${
              viewType === "write"
                ? "text-black dark:text-gray-200"
                : "dark:text-gray-600 text-gray-400"
            } hover:text-black dark:hover:text-white transition text-xl`}
          >
            <Icons.typeWriter />
          </Link>
        )}

        <Link
          href={`/convos/${contentId}?view=insights&start=${searchParams.get("start") || 0}`}
          onClick={() => {
            setViewType("insights");
          }}
          className={`transition ${
            viewType === "insights"
              ? "text-black dark:text-gray-200"
              : "dark:text-gray-600 text-gray-400"
          } hover:text-black dark:hover:text-white transition text-xl`}
        >
          <Icons.chartColumn />
        </Link>

        {isAuthor && (
          <Link
            onClick={() => {
              setViewType("settings");
            }}
            href={`/convos/${contentId}?view=settings&start=${searchParams.get("start") || 0}`}
            className={`transition ${
              viewType === "settings"
                ? "text-black dark:text-gray-200"
                : "dark:text-gray-600 text-gray-400"
            } hover:text-black dark:hover:text-white transition text-xl`}
          >
            <Icons.gear />
          </Link>
        )}

        <Link
          href={`/convos/${contentId}?view=ai&start=${searchParams.get("start") || 0}`}
          onClick={() => {
            setViewType("ai");
          }}
          className={`transition ${
            viewType === "ai"
              ? "text-black dark:text-gray-200"
              : "text-gray-200 dark:text-gray-600"
          } hover:text-black dark:hover:text-white transition text-xl`}
        >
          <Icons.ai />
        </Link>
      </div>
    </div>
  );
};
