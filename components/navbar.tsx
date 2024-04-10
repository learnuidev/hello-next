"use client";

import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMountainSun } from "@fortawesome/pro-duotone-svg-icons/faMountainSun";
import { faChartColumn } from "@fortawesome/sharp-solid-svg-icons/faChartColumn";

import { faTableTree } from "@fortawesome/sharp-solid-svg-icons/faTableTree";
import { NomadIcon } from "./ui/icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useState } from "react";
import { useSearchQueryStore } from "./search/state";
import React from "react";

import { useEffect } from "react";

import { useSelectedCharacter } from "@/app/(auth)/convos/use-selected-character";
import { faPlayCircle, faX, faXmark } from "@fortawesome/pro-thin-svg-icons";
import { belts } from "@/app/nmm/utils";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useBeltStore } from "./use-belt-store";
import { useListAnswersQuery } from "@/domain/lesson/answer.queries";
import { useListComponents } from "@/domain/lesson/component.queries";
import { faPhotoFilm } from "@fortawesome/sharp-solid-svg-icons";
import { useListCharacterReviewList } from "@/hooks/use-character-review-list";
import { Icons } from "./ui/icons.v2";
import { SearchBar } from "./search-bar";

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

function useGoldenCharacters(belt: any) {
  const { data: components, isLoading } = useListComponents();

  const { data: answers } = useListAnswersQuery(
    {},
    {
      refetchOnWindowFocus: false,
      refetchOnFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  const lastAnswer = answers?.[answers?.length - 1];

  return components?.filter((component: any) => {
    return (
      lastAnswer?.totalCharacters?.includes(component?.hanzi) &&
      component?.level <= belt?.maxCharacterLevel
    );
  });
}

function formatPercentage(number: number) {
  return Intl.NumberFormat("en-GB", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
}

export const NavBar = ({
  onSubmit,
  input,
  handleInputChange,
}: {
  onSubmit: any;
  input: any;
  handleInputChange: any;
}) => {
  const routeName = usePathname();
  const belt = useBeltStore((x) => x?.selectedBelt);

  const goldenChars = useGoldenCharacters(belt);

  const setSelectedBelt = useBeltStore((x) => x?.setSelectedBelt);

  const selectedChar = useSelectedCharacter((state: any) => state?.character);
  const setSelectedChar = useSelectedCharacter(
    (state: any) => state?.setCharacter
  );

  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQueryParams = searchParams.get("query");

  const [isSearchOpen, setIsSearchOpen] = useState("");

  const [queryStatus, setQueryStatus] = useState("idle");
  const query = useSearchQueryStore((state) => state.query);
  const setQuery = useSearchQueryStore((state) => state.setQuery);
  // const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0);

  const option = options?.[index % options.length];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((seconds) => seconds + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  var expression =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  const { data: learnedCharacters2 } = useListCharactersQuery();

  const { data: reviewList } = useListCharacterReviewList();

  useEffect(() => {
    if (searchQueryParams) {
      setQuery(searchQueryParams);
    }
  }, [searchQueryParams, setQuery]);

  if (selectedChar || routeName === "/") {
    return null;
  }

  return (
    <div className="flex justify-between items-center w-full px-4 md:px-12 md:my-2">
      {routeName === "/" ? null : (
        // <Link
        //   className="my-2 dark:text-gray-500 dark:hover:text-gray-300 transition"
        //   href="/insights"
        // >
        //   <FontAwesomeIcon className="text-3xl" icon={faXmark} />
        // </Link>
        <div className="my-2 flex space-x-2 md:space-x-8 items-center">
          <Link className={belt?.color} href="/">
            <FontAwesomeIcon icon={faMountainSun} />
          </Link>

          <div>
            <div className="space-x-2 flex items-center">
              <button
                onClick={() => {
                  // 1. find current Index
                  const currentIndex = belts?.findIndex(
                    (b) => b?.level === belt?.level
                  );

                  // 2. if it is the last itme, set the belt to first belt
                  if (currentIndex === belts?.length - 1) {
                    setSelectedBelt(belts?.[0]);
                  } else {
                    // 3. else set the next belt
                    setSelectedBelt(belts?.[currentIndex + 1]);
                  }

                  // setSelectedBelt()
                }}
                key={belt?.fill}
                className={`${belt?.fill} h-4 w-4 rounded-full text`}
              >
                {" "}
              </button>

              {belt ? (
                <span>
                  {formatPercentage(
                    (learnedCharacters2?.length || 0) / belt?.maxCharacterLevel
                  )}
                </span>
              ) : null}

              {belt ? (
                <span className="text-yellow-500">
                  {formatPercentage(
                    (goldenChars?.length || 0) / belt?.maxCharacterLevel
                  )}
                </span>
              ) : null}
            </div>
          </div>

          {/* <Link className="my-2" href="/">
            <FontAwesomeIcon icon={faMountainSun} />
          </Link> */}
        </div>
      )}

      {routeName === "/" || routeName === "/chat" ? (
        <div className="h-12"> </div>
      ) : (
        <SearchBar />
      )}

      <div>
        {routeName === "/" ? (
          <div className="h-12"> </div>
        ) : (
          <div className="my-2 flex justify-center items-center space-x-8 text-xs md:text-md">
            {reviewList?.length > 1 ? (
              <Link
                href="/review"
                className={`transition ${
                  routeName?.includes("/review")
                    ? "text-gray-800 dark:text-gray-300"
                    : "text-gray-200 dark:text-gray-500"
                } hover:text-gray-700 transition text-xl`}
              >
                {/* <FontAwesomeIcon icon={faComment} /> */}
                <FontAwesomeIcon icon={faPlayCircle} />
              </Link>
            ) : null}
            <Link
              href="/convos"
              className={`transition ${
                routeName?.includes("/convos")
                  ? "text-gray-800 dark:text-gray-300"
                  : "text-gray-200 dark:text-gray-500"
              } hover:text-gray-700 transition text-xl`}
            >
              {/* <FontAwesomeIcon icon={faComment} /> */}
              <FontAwesomeIcon icon={faPhotoFilm} />
            </Link>
            <Link
              href="/timeline"
              className={`transition ${
                routeName === "/timeline"
                  ? "text-gray-800 dark:text-gray-300"
                  : "text-gray-200 dark:text-gray-500"
              } hover:text-gray-700 transition text-xl hidden md:block`}
            >
              <Icons.verticalStack />
            </Link>

            <Link
              href="/pinyin"
              className={`transition ${
                routeName === "/pinyin"
                  ? "text-gray-800 dark:text-gray-300"
                  : "text-gray-200 dark:text-gray-500"
              } hover:text-gray-700 transition text-xl hidden md:block`}
            >
              <FontAwesomeIcon icon={faTableTree} />
            </Link>
            <Link
              href="/insights"
              className={`transition ${
                routeName === "/insights"
                  ? "text-gray-800 dark:text-gray-300"
                  : "text-gray-200 dark:text-gray-500"
              } hover:text-gray-700 transition text-xl`}
            >
              <FontAwesomeIcon icon={faChartColumn} />
            </Link>

            <Link
              href="/nmm"
              className={`transition ${
                routeName === "/nmm"
                  ? "text-gray-800 dark:text-gray-300"
                  : "text-gray-200 dark:text-gray-500"
              } hover:text-gray-700 transition text-xl`}
            >
              <NomadIcon />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
