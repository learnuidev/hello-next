import { cn } from "@/lib/utils";
import { Icons } from "./ui/icons.v2";

import Link from "next/link";

import { useParams, usePathname, useSearchParams } from "next/navigation";
import { NomadIcon } from "./ui/icons";

import { TheDock } from "@/components/the-dock";
import { useListCharacterReviewList } from "@/hooks/use-character-review-list";
import { useGetCurrentLang } from "@/hooks/use-get-current-lang";

import { FloatingDuNavbar } from "@/app/(auth)/du/components/floating-du-navbar";
import { useReviewModeView } from "@/app/review/use-review-mode";
import { useIsDu } from "@/hooks/use-is-du";
import { useIsDuLessons } from "@/hooks/use-is-du-lessons";
import { useShowAutomaticallyTheDock } from "@/hooks/use-show-automatically-the-dock";
import { BrightModeButton } from "./bright-mode-button";
import { PinyinButton } from "./pinyin-button";
import { useGetReviewUrl } from "./settings-dialog/use-get-review-url";

import { ReviewNavbar } from "@/app/review/review-navbar";
import { useGetContentQuery } from "@/domain/content/content.queries";
import { isNonRomanLang } from "./_select-character/utils/is-non-roman-lang";
import { CommonCharacterButton } from "./common-character-button";
import { usePreviousPathnameStore } from "./language-selector/use-previous-path-name-store";

const FloatingNavbarComp = () => {
  const routeName = usePathname();
  const reviewUrl = useGetReviewUrl();

  const { reviewMode: _reviewMode } = useReviewModeView();

  const params = useParams<{ "content-id": string }>();
  const contentId = params?.["content-id"];

  const { data: content } = useGetContentQuery({ contentId: contentId || "" });

  const isDuExact = useIsDu(true);
  const isDu = useIsDu(false);

  const { data: reviewList } = useListCharacterReviewList();

  const lang = useGetCurrentLang();

  const isDuLessons = useIsDuLessons();

  const pathName = usePathname();

  const { setPreviousPath, previousPath } = usePreviousPathnameStore();

  const searchParams = useSearchParams();

  if (isDu) {
    if (isDuExact) {
      return <FloatingDuNavbar />;
    }
  }

  if (isDuLessons) {
    return null;
  }

  const isChineseLang = lang === "zh";

  if (routeName?.includes("/review")) {
    return <ReviewNavbar />;
  }

  return (
    <div
      className={cn("transition", "flex items-center w-full justify-center")}
    >
      <div className="overflow-y-auto px-8 py-2 bg-gray-50 dark:bg-black no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
        <div className="space-x-6 md:space-x-8 flex justify-center items-center w-full ">
          {!["/", "/apps", "/convos"]?.includes(routeName) && isChineseLang && (
            <>
              {content?.lang === "zh" && <CommonCharacterButton />}
              {content?.lang === "zh" && <BrightModeButton />}
            </>
          )}

          {isNonRomanLang(content?.lang) && <PinyinButton />}

          <Link
            href="/"
            className={`transition ${
              routeName?.includes("/")
                ? "text-gray-800 dark:text-gray-300"
                : "text-gray-500 dark:text-gray-500"
            } hover:text-rose-400 dark:hover:text-white transition text-xl`}
          >
            {routeName === "/" ? (
              <Icons.mandarinSolid className="hover:text-rose-400 dark:hover:text-white transition" />
            ) : (
              <Icons.mandarin className="hover:text-rose-400 dark:hover:text-white transition" />
            )}
          </Link>
          <Link
            href="/convos"
            className={`transition ${
              routeName?.includes("/convos")
                ? "text-gray-800 dark:text-gray-300"
                : "text-gray-500 dark:text-gray-500"
            } hover:text-rose-400 dark:hover:text-white transition text-xl`}
          >
            {routeName?.includes("/convos") ? (
              <Icons.contentSolid className="hover:text-rose-400 dark:hover:text-white transition" />
            ) : (
              <Icons.content className="hover:text-rose-400 dark:hover:text-white transition" />
            )}
          </Link>

          {reviewList?.length > 1 ? (
            <Link
              href={reviewUrl}
              target="_blank"
              onClick={() => {
                // router.push(reviewUrl);
                setPreviousPath(
                  `${pathName}?start=${searchParams.get("start") || 0}`
                );
              }}
              className={cn(
                routeName?.includes("/review")
                  ? "text-gray-800 dark:text-gray-300"
                  : "text-gray-500 dark:text-gray-500",
                "transition text-xl "
              )}
            >
              <Icons.playCircle className="hover:text-rose-400 dark:hover:text-white transition" />
            </Link>
          ) : null}

          <Link
            href="/timeline"
            className={`transition ${
              routeName === "/timeline"
                ? "text-gray-800 dark:text-gray-300"
                : "text-gray-500 dark:text-gray-500"
            } hover:text-gray-700 transition text-xl`}
          >
            <Icons.verticalStack className="hover:text-rose-400 dark:hover:text-white transition" />
          </Link>

          {/* <Link
            href="/insights"
            className={`transition ${
              routeName === "/insights"
                ? "text-gray-800 dark:text-gray-300"
                : "text-gray-500 dark:text-gray-500"
            } hover:text-gray-700 transition text-xl`}
          >
            <Icons.chartColumn className="hover:text-rose-400 dark:hover:text-white transition" />
          </Link> */}

          {/* {(!lang || isChineseLang) && (
            <Link
              href="/pinyin"
              className={`transition ${
                routeName === "/pinyin"
                  ? "text-gray-800 dark:text-gray-300"
                  : "text-gray-500 dark:text-gray-500"
              } hover:text-gray-700 transition text-xl`}
            >
              <Icons.pinyinChart className="hover:text-rose-400 dark:hover:text-white transition" />
            </Link>
          )} */}

          <Link
            href="/apps"
            className={`transition ${
              routeName === "/apps"
                ? "text-gray-800 dark:text-gray-300"
                : "text-gray-500 dark:text-gray-500"
            } hover:text-gray-700 transition text-xl`}
          >
            <Icons.apps className="hover:text-rose-400 dark:hover:text-white transition" />
          </Link>

          <Link
            href="/nmm"
            className={`transition ${
              routeName === "/nmm"
                ? "text-gray-800 dark:text-gray-300"
                : "text-gray-500 dark:text-gray-500"
            } hover:text-gray-700 transition text-xl`}
          >
            <NomadIcon className="hover:text-rose-400 dark:hover:text-white transition" />
          </Link>
        </div>

        <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
      </div>
    </div>
    // </div>
  );
};
export const FloatingNavbar = () => {
  const routeName = usePathname();
  const isReviewUrl = routeName?.includes("/review");

  const isAutomatic = useShowAutomaticallyTheDock();

  return (
    <TheDock
      className="bottom-2"
      innerClassName={isReviewUrl ? "sm:block" : ""}
      isAutomatic={isAutomatic}
    >
      <FloatingNavbarComp />
    </TheDock>
  );
};
