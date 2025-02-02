"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartColumn } from "@fortawesome/sharp-solid-svg-icons/faChartColumn";

import { faXmark } from "@fortawesome/pro-light-svg-icons/faXmark";
import { useParams, usePathname, useRouter } from "next/navigation";

import { useConvosStore } from "@/stores/convos-store";

import { Icons } from "@/components/ui/icons.v2";
import {
  faMicrophone,
  faSeedling,
  faTypewriter,
} from "@fortawesome/sharp-solid-svg-icons";
import { useIsContentAuthor } from "./[content-id]/hooks/use-is-content-author";
import { useGetContentQuery } from "@/domain/content/content.queries";

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
  const routeName = usePathname();

  // CONVOS
  const lessonId = useConvosStore((state: any) => state?.convoId);
  const setLessonId = useConvosStore((state: any) => state?.setConvoId);
  const removeLessonId = useConvosStore((state: any) => state?.removeConvoId);

  const setViewType = useConvosStore((state: any) => state?.setViewType);
  const viewType = useConvosStore((state: any) => state?.viewType);

  const params = useParams() as {
    "content-id": string;
  };

  const contentId = params["content-id"];

  const { data: content } = useGetContentQuery({ contentId });

  const isAuthor = useIsContentAuthor(contentId);

  const router = useRouter();

  return (
    <div className="z-50 flex justify-between items-center w-full md:mt-2 my-2 py-2">
      <button
        className="text-3xl"
        onClick={() => {
          removeLessonId();
          router.push(`/convos`);
        }}
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>

      <div className="my-2 flex justify-center items-center space-x-8 text-xs md:text-md">
        <button
          onClick={() => {
            setViewType("listen");
          }}
          className={`transition ${
            viewType === "listen"
              ? "text-black dark:text-gray-200"
              : "text-gray-200 dark:text-gray-800"
          } hover:text-black dark:hover:text-white transition text-xl`}
        >
          <Icons.musicNoteSolid />
        </button>
        {content?.lang === "zh" && (
          <button
            onClick={() => {
              setViewType("write");
            }}
            className={`transition ${
              viewType === "write"
                ? "text-black dark:text-gray-200"
                : "dark:text-gray-800 text-gray-400"
            } hover:text-black dark:hover:text-white transition text-xl`}
          >
            <FontAwesomeIcon icon={faTypewriter} />
          </button>
        )}
        {/* <button
          onClick={() => {
            setViewType("speak");
          }}
          className={`transition ${
            viewType === "speak" ? "text-black dark:text-gray-200" : "dark:text-gray-800 text-gray-400"
          } hover:text-black dark:hover:text-white transition text-xl`}
        >
          <Icons.microphone />
        </button> */}

        {/* <button
          onClick={() => {
            setViewType("learn");
          }}
          className={`transition ${
            viewType === "learn" ? "text-green-200" : "dark:text-gray-800 text-gray-400"
          } hover:text-green-500 transition text-xl`}
        >
          <Icons.seedling />
        </button> */}
        {content?.lang === "zh" && (
          <button
            onClick={() => {
              setViewType("insights");
            }}
            className={`transition ${
              viewType === "insights"
                ? "text-black dark:text-gray-200"
                : "dark:text-gray-800 text-gray-400"
            } hover:text-black dark:hover:text-white transition text-xl`}
          >
            <Icons.chartColumn />
          </button>
        )}
        {isAuthor && (
          <button
            onClick={() => {
              setViewType("settings");
            }}
            className={`transition ${
              viewType === "settings"
                ? "text-black dark:text-gray-200"
                : "dark:text-gray-800 text-gray-400"
            } hover:text-black dark:hover:text-white transition text-xl`}
          >
            <Icons.gear />
          </button>
        )}

        <button
          onClick={() => {
            setViewType("ai");
          }}
          className={`transition ${
            viewType === "ai"
              ? "text-black dark:text-gray-200"
              : "text-gray-200 dark:text-gray-800"
          } hover:text-black dark:hover:text-white transition text-xl`}
        >
          <Icons.ai />
        </button>
      </div>
    </div>
  );
};
