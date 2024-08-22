import { Icons } from "./ui/icons.v2";
import { cn } from "@/lib/utils";
import { useToast } from "./ui/use-toast";

import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartColumn } from "@fortawesome/sharp-solid-svg-icons/faChartColumn";

import { faTableTree } from "@fortawesome/sharp-solid-svg-icons/faTableTree";
import { NomadIcon } from "./ui/icons";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import React, { useState } from "react";

import { faPlayCircle } from "@fortawesome/pro-thin-svg-icons";

import { faPhotoFilm } from "@fortawesome/sharp-solid-svg-icons";
import { useListCharacterReviewList } from "@/hooks/use-character-review-list";
import { useGetCurrentLang } from "@/hooks/use-get-current-lang";

const FloatingNavbarComp = () => {
  const { toast } = useToast();

  const routeName = usePathname();

  const { data: reviewList } = useListCharacterReviewList();

  const lang = useGetCurrentLang();

  if (routeName === "/pinyin") {
    return null;
  }

  return (
    // <div className={cn("flex w-full fixed z-50 bottom-4")}>
    <div
      className={cn("transition", "flex items-center w-full justify-center")}
    >
      <div className="px-8  py-2 bg-black no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
        <div className="space-x-8 flex justify-center items-center w-full">
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
            <FontAwesomeIcon
              icon={faChartColumn}
              className="hover:text-white transition"
            />
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
              <FontAwesomeIcon
                icon={faTableTree}
                className="hover:text-white transition"
              />
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
  const { toast } = useToast();
  const [show, setShow] = useState(false);

  const routeName = usePathname();

  const { data: reviewList } = useListCharacterReviewList();

  const lang = useGetCurrentLang();

  return (
    <div>
      <div className={cn("flex w-full fixed z-50 bottom-4")}>
        <div className="block sm:hidden w-full">
          <FloatingNavbarComp />
        </div>
      </div>

      <div
        onMouseEnter={() => {
          setShow(true);
        }}
        onMouseLeave={() => {
          setShow(false);
        }}
        className={cn("flex w-full fixed z-50 bottom-4")}
      >
        <div className="text-black">TODO</div>
        <AnimatePresence>
          {/* {show && (
            <motion.div
              exit={{
                y: -20,
                opacity: 0,
                filter: "blur(50px)",
                transition: { ease: "easeIn", duration: 0.12 },
              }}
              initial={{
                opacity: 0,
                scale: 0.9,
                // y: 20,
                filter: "blur(80px)",
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { type: "spring", duration: 0.2 },
              }}
              className={cn(
                "transition",
                show ? "visible" : "invisible",
                "hidden sm:block w-full"
              )}
            >
              <FloatingNavbarComp />
            </motion.div>
          )} */}

          {show && (
            <motion.div
              exit={{
                y: -20,
                opacity: 0,
                scale: 0.8,
                filter: "blur(800px)",
                transition: { ease: "easeIn", duration: 0.12 },
              }}
              initial={{
                opacity: 0,
                scale: 0.9,
                y: 20,
                filter: "blur(800px)",
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                filter: "blur(0px)",
                transition: {
                  duration: 0.1,
                  ease: "easeIn",
                  type: "just",
                },
              }}
              className={cn(
                "transition",
                // show ? "visible" : "invisible",
                "hidden sm:block w-full"
              )}
            >
              <FloatingNavbarComp />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
