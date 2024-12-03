import { cn } from "@/lib/utils";
import { Icons } from "./ui/icons.v2";

import Link from "next/link";

import { usePathname } from "next/navigation";
import { NomadIcon } from "./ui/icons";

import { TheDock } from "@/components/the-dock";
import { useListCharacterReviewList } from "@/hooks/use-character-review-list";
import { useGetCurrentLang } from "@/hooks/use-get-current-lang";
import { useReadModeStore } from "@/stores/use-readmode-store";
import { useBrightModeStore } from "./settings-dialog/use-bright-mode-store";

import { DuNavbar } from "@/app/(auth)/du/components/du-navbar";
import { useGetReviewParams } from "@/app/review/use-get-review-params";
import { useShowAutomaticallyTheDock } from "@/hooks/use-show-automatically-the-dock";
import {
  useGetReviewUrl,
  useGetReviewUrlFn,
} from "./settings-dialog/use-get-review-url";

const FloatingNavbarComp = () => {
  const routeName = usePathname();
  const reviewUrl = useGetReviewUrl();

  const reviewUrlFn = useGetReviewUrlFn();
  const { reviewMode } = useGetReviewParams();

  const { data: reviewList } = useListCharacterReviewList();

  const lang = useGetCurrentLang();

  const setBrightMode = useBrightModeStore((state: any) => state.setMode);
  const setReadMode = useReadModeStore((state) => state.setReadMode);
  const readMode = useReadModeStore((state) => state.readMode);

  if (routeName?.includes("/du")) {
    return <DuNavbar />;
  }
  if (routeName?.includes("/review")) {
    return (
      <div
        className={cn("transition", "flex items-center w-full justify-center")}
      >
        <div className="overflow-y-auto px-8 py-2 bg-black no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
          <div className="space-x-6 md:space-x-8 flex justify-center items-center w-full ">
            <Link
              href={reviewUrlFn({ reviewMode: "all" })}
              className={`transition ${
                reviewMode === "all"
                  ? "text-gray-800 dark:text-gray-300"
                  : "text-gray-200 dark:text-gray-500"
              } hover:text-gray-700 transition text-xl`}
            >
              <Icons.globeAsia className="hover:text-white transition" />
            </Link>

            <Link
              href={reviewUrlFn({ reviewMode: "" })}
              className={`transition ${
                !reviewMode
                  ? "text-gray-800 dark:text-gray-300"
                  : "text-gray-200 dark:text-gray-500"
              } hover:text-gray-700 transition text-xl`}
            >
              <Icons.lightBulb className="hover:text-white transition" />
            </Link>
          </div>

          <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
        </div>
      </div>
    );
  }

  return (
    // <div className={cn("flex w-full fixed z-50 bottom-4")}>
    <div
      className={cn("transition", "flex items-center w-full justify-center")}
    >
      <div className="overflow-y-auto px-8 py-2 bg-black no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
        <div className="space-x-6 md:space-x-8 flex justify-center items-center w-full ">
          <button
            className={cn(
              "text-xl",
              readMode
                ? "text-gray-800 dark:text-gray-300"
                : "text-gray-200 dark:text-gray-500"
            )}
            onClick={() => {
              setBrightMode((prev: any) => !prev);
              setReadMode(!readMode);
            }}
          >
            <Icons.glassesRound />
          </button>

          <Link
            href="/diary"
            className={`transition ${
              routeName?.includes("/diary")
                ? "text-gray-800 dark:text-gray-300"
                : "text-gray-200 dark:text-gray-500"
            } hover:text-white transition text-xl`}
          >
            {routeName?.includes("/diary") ? (
              <Icons.diary className="hover:text-white transition" />
            ) : (
              <Icons.diary className="hover:text-white transition" />
            )}
          </Link>
          <Link
            href="/convos"
            className={`transition ${
              routeName?.includes("/convos")
                ? "text-gray-800 dark:text-gray-300"
                : "text-gray-200 dark:text-gray-500"
            } hover:text-white transition text-xl`}
          >
            {routeName?.includes("/convos") ? (
              <Icons.contentSolid className="hover:text-white transition" />
            ) : (
              <Icons.content className="hover:text-white transition" />
            )}
          </Link>

          {reviewList?.length > 1 ? (
            <Link
              href={reviewUrl}
              className={cn(
                routeName?.includes("/review")
                  ? "text-gray-800 dark:text-gray-300"
                  : "text-gray-200 dark:text-gray-500",
                "transition text-xl "
              )}
            >
              <Icons.playCircle className="hover:text-white transition" />
            </Link>
          ) : null}

          <Link
            href="/timeline"
            className={`transition ${
              routeName === "/timeline"
                ? "text-gray-800 dark:text-gray-300"
                : "text-gray-200 dark:text-gray-500"
            } hover:text-gray-700 transition text-xl`}
          >
            <Icons.verticalStack className="hover:text-white transition" />
          </Link>

          <Link
            href="/insights"
            className={`transition ${
              routeName === "/insights"
                ? "text-gray-800 dark:text-gray-300"
                : "text-gray-200 dark:text-gray-500"
            } hover:text-gray-700 transition text-xl`}
          >
            <Icons.chartColumn className="hover:text-white transition" />
          </Link>

          {(!lang || lang === "zh") && (
            <Link
              href="/pinyin"
              className={`transition ${
                routeName === "/pinyin"
                  ? "text-gray-800 dark:text-gray-300"
                  : "text-gray-200 dark:text-gray-500"
              } hover:text-gray-700 transition text-xl`}
            >
              <Icons.pinyinChart className="hover:text-white transition" />
            </Link>
          )}

          <Link
            href="/nmm"
            className={`transition ${
              routeName === "/nmm"
                ? "text-gray-800 dark:text-gray-300"
                : "text-gray-200 dark:text-gray-500"
            } hover:text-gray-700 transition text-xl`}
          >
            <NomadIcon className="hover:text-white transition" />
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
      className="sm:bottom-0 bottom-4"
      innerClassName={isReviewUrl ? "sm:block" : ""}
      isAutomatic={isAutomatic}
    >
      <FloatingNavbarComp />
    </TheDock>
  );
};
