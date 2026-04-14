import { cn } from "@/lib/utils";
import { Icons } from "./ui/icons.v2";

import Link from "next/link";

import { useParams, usePathname } from "next/navigation";

import { TheDock } from "@/components/the-dock";
import { useGetCurrentLang } from "@/hooks/use-get-current-lang";

import { useReviewModeView } from "@/app/review/use-review-mode";
import { useShowAutomaticallyTheDock } from "@/hooks/use-show-automatically-the-dock";

import { ReviewNavbar } from "@/app/review/review-navbar";
import { useGetContentQuery } from "@/domain/content/content.queries";
import { ContentReviewButton } from "./content-review-button/content-review-button";

const FloatingNavbarComp = () => {
  const routeName = usePathname();

  const { reviewMode: _reviewMode } = useReviewModeView();

  const params = useParams<{ "content-id": string }>();
  const contentId = params?.["content-id"];

  const { data: content } = useGetContentQuery({ contentId: contentId || "" });

  const lang = useGetCurrentLang();

  if (routeName?.includes("/review")) {
    return <ReviewNavbar />;
  }

  return (
    <div
      className={cn("transition", "flex items-center w-full justify-center")}
    >
      <div className="overflow-y-auto px-8 py-2 bg-gray-50 dark:bg-black no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
        <div className="space-x-6 md:space-x-8 flex justify-center items-center w-full ">
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

          <ContentReviewButton />

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
