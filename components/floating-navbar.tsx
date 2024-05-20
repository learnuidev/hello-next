import { Icons } from "./ui/icons.v2";
import { cn } from "@/lib/utils";
import { useToast } from "./ui/use-toast";

import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartColumn } from "@fortawesome/sharp-solid-svg-icons/faChartColumn";

import { faTableTree } from "@fortawesome/sharp-solid-svg-icons/faTableTree";
import { NomadIcon } from "./ui/icons";
import { usePathname } from "next/navigation";

import React from "react";

import { faPlayCircle } from "@fortawesome/pro-thin-svg-icons";

import { faPhotoFilm } from "@fortawesome/sharp-solid-svg-icons";
import { useListCharacterReviewList } from "@/hooks/use-character-review-list";
import { useGetCurrentLang } from "@/hooks/use-get-current-lang";

export const FloatingNavbar = () => {
  const { toast } = useToast();

  const routeName = usePathname();

  const { data: reviewList } = useListCharacterReviewList();

  const lang = useGetCurrentLang();

  return (
    <div className="flex w-full fixed z-50 bottom-4">
      <div className="flex items-center w-full justify-center">
        <div className="px-8  py-2 bg-black no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
          <div className="space-x-8 flex justify-center items-center w-full">
            {reviewList?.length > 1 ? (
              <Link
                href="/review"
                className={cn(
                  routeName?.includes("/review")
                    ? "text-gray-800 dark:text-gray-300"
                    : "text-gray-200 dark:text-gray-500",
                  "transition text-xl "
                )}
              >
                <FontAwesomeIcon
                  icon={faPlayCircle}
                  className="hover:text-white transition"
                />
              </Link>
            ) : null}
            <Link
              href="/convos"
              className={`transition ${
                routeName?.includes("/convos")
                  ? "text-gray-800 dark:text-gray-300"
                  : "text-gray-200 dark:text-gray-500"
              } hover:text-white transition text-xl`}
            >
              <FontAwesomeIcon
                icon={faPhotoFilm}
                className="hover:text-white transition"
              />
            </Link>
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

            {(!lang || lang === "zh") && (
              <Link
                href="/pinyin"
                className={`transition ${
                  routeName === "/pinyin"
                    ? "text-gray-800 dark:text-gray-300"
                    : "text-gray-200 dark:text-gray-500"
                } hover:text-gray-700 transition text-xl hidden md:block`}
              >
                <FontAwesomeIcon
                  icon={faTableTree}
                  className="hover:text-white transition"
                />
              </Link>
            )}
            <Link
              href="/insights"
              className={`transition ${
                routeName === "/insights"
                  ? "text-gray-800 dark:text-gray-300"
                  : "text-gray-200 dark:text-gray-500"
              } hover:text-gray-700 transition text-xl`}
            >
              <FontAwesomeIcon
                icon={faChartColumn}
                className="hover:text-white transition"
              />
            </Link>

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
    </div>
  );
};
