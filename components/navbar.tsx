"use client";

import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMountainSun } from "@fortawesome/pro-duotone-svg-icons/faMountainSun";
import {
  faChartColumn,
  faGraduationCap,
  faMap,
  faMapLocation,
  faSearch,
  faTable,
  faTableTree,
} from "@fortawesome/sharp-solid-svg-icons";
import { NomadIcon } from "./ui/icons";
import { usePathname, useRouter } from "next/navigation";

import { useState } from "react";
import { useSearchQueryStore } from "./search/state";
import React from "react";

import { useEffect } from "react";

import { filterHmm, parse } from "@/data/utils";

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

export const NavBar = () => {
  const route = usePathname();

  const router = useRouter();

  const [isSearchOpen, setIsSearchOpen] = useState("");

  const [queryStatus, setQueryStatus] = useState("idle");
  const query = useSearchQueryStore((state) => state.query);
  const setQuery = useSearchQueryStore((state) => state.setQuery);
  // const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0);

  const queryResult = useSearchQueryStore((state) => state.queryResult) as any;
  const setQueryResult = useSearchQueryStore((state) => state.setQueryResult);
  const nepaliQueryResult = useSearchQueryStore(
    (state) => state.nepaliQueryResult
  ) as any;
  const setNepaliQueryResult = useSearchQueryStore(
    (state) => state.setNepaliQueryResult
  );

  const option = options?.[index % options.length];

  const search = async (query: string) => {
    // check for special characters
    if (["word", "character", "pronoun", "conjunction"].includes(query)) {
      alert(query);
      const resp = filterHmm(query);

      // const resp2 = resp?.length ? resp : _filteredNepaliWords(nepaliWords203)

      setQueryResult(resp);

      //   const resp2 = _filteredNepaliWords(nepaliWords203);
      setQueryStatus("success");
    } else {
      //  我爸爸在看电视
      // const res = await fetch(`${giphySearchUrl}${query}`)
      // const resp = await res.json()
      const resp = parse(query);
      setQueryResult(resp);
      //   const resp2 = _filteredNepaliWords(nepaliWords203);
      //   setNepaliQueryResult(resp2);
      setQueryStatus("success");
    }
  };

  const search2 = async (context: string, query: string) => {
    // check for special characters
    if (
      ["word", "character", "pronoun", "conjunction", "verb"].includes(query)
    ) {
      // alert(query)
      const resp = filterHmm(query)?.filter((item: any) =>
        item?.hanzi?.includes(context)
      );
      // const resp = filterHmm(query)
      // alert(JSON.stringify(resp))
      // setQueryResult(resp);
      setQueryStatus("success");
    } else {
      //  我爸爸在看电视
      // const res = await fetch(`${giphySearchUrl}${query}`)
      // const resp = await res.json()
      // const resp = parse(query);
      // setQueryResult(resp);
      setQueryStatus("success");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((seconds) => seconds + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  var expression =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  const determineSearch = (query: any) => {
    if (query.match(regex)) {
      alert("Its a url");
      return {
        type: "url",
        query,
      };
    } else if (parse(query)?.length) {
      return {
        type: "hanzi",
        query: query,
        data: parse(query),
      };
    } else {
      return {
        type: "en",
        query,
      };
    }
  };

  const handleSearch = () => {
    if (query.match(regex)) {
      alert("Its a url");
    } else {
      search(query);
    }
  };
  const handleSearch2 = (context: any, query: any) => {
    if (query.match(regex)) {
      alert("Its a url");
    } else {
      search2(context, query);
    }
  };

  // const setQuery = useSearchQueryStore((state) => state.setQuery);
  // const query = useSearchQueryStore((state) => state.query);
  return (
    <div className="flex justify-between items-center w-full px-4 md:px-32 md:mt-2">
      <Link className="my-2" href="/">
        <FontAwesomeIcon icon={faMountainSun} />
      </Link>

      <div className="hidden sm:block my-2 flex flex-row justify-center space-x-4 items-center">
        <div className="flex items-center justify-center"></div>

        <input
          className="dark:placeholder:text-gray-500 border-gray-100 focus:border-gray-300 dark:bg-black dark:text-gray-300 placeholder:text-gray-400 opacity-100 transition-all  duration-400 ease-in border-2 w-[140px] md:w-[500px] focus:w-[600px] px-4 py-2 rounded-full focus:outline-none active:outline-none"
          placeholder={"Search"}
          onChange={(event) => {
            setQuery(() => event?.target?.value);
          }}
          value={query}
          onKeyDown={(event) => {
            if (event?.keyCode === 13) {
              if (option.value as any) {
                handleSearch();
                router.push("/search");
              }
            }
          }}
        />

        {/* <button
          // onClick={handleSearch}
          className="flex space-x-2 items-center text-[14px] tracking-widest font-light uppercase bg-black text-white dark:text-gray-500 dark:hover:text-white hover:shadow-gray-300 hover:shadow-green-500 hover:border-green-500 shadow-2 shadow-md border-[1px] border-gray-400 dark:border-gray-800 px-4 py-2 rounded-full transition"
        >
          <SearchIcon />
          <span className="hidden sm:block"> Search </span>
        </button> */}
      </div>
      <div className="my-2 flex justify-center items-center space-x-8 text-xs md:text-md">
        {/* <button
          // href="/search"
          onClick={() => {
            // toggleSearch()
          }}
          className={`transition ${
            route === "/search" ? "text-gray-800" : "text-gray-200"
          } hover:text-gray-700 transition text-xl`}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button> */}
        <Link
          href="/search"
          className={`transition ${
            route === "/search" ? "text-gray-800" : "text-gray-200"
          } hover:text-gray-700 transition text-xl`}
        >
          <FontAwesomeIcon icon={faSearch} />
        </Link>
        <Link
          href="/courses"
          className={`transition ${
            route === "/courses" ? "text-gray-800" : "text-gray-200"
          } hover:text-gray-700 transition text-xl`}
        >
          <FontAwesomeIcon icon={faGraduationCap} />
        </Link>
        <Link
          href="/pinyin"
          className={`transition ${
            route === "/pinyin" ? "text-gray-800" : "text-gray-200"
          } hover:text-gray-700 transition text-xl`}
        >
          <FontAwesomeIcon icon={faTableTree} />
        </Link>
        <Link
          href="/analytics"
          className={`transition ${
            route === "/analytics" ? "text-gray-800" : "text-gray-200"
          } hover:text-gray-700 transition text-xl`}
        >
          <FontAwesomeIcon icon={faChartColumn} />
        </Link>
        {/* <Link
          href="/features"
          className="text-gray-400 hover:text-gray-700 transition"
        >
          features
        </Link> */}
        {/* <Link
          href="/notes"
          className="text-gray-400 hover:text-gray-700 transition"
        >
          notes
        </Link> */}
        <Link
          href="/nmm"
          className={`transition ${
            route === "/nmm" ? "text-gray-800" : "text-gray-200"
          } hover:text-gray-700 transition text-xl`}
          // className="text-gray-400 hover:text-gray-700 transition text-xl"
        >
          <NomadIcon />
        </Link>
        <Link
          href="/map"
          className={`transition ${
            route === "/map" ? "text-gray-800" : "text-gray-200"
          } hover:text-gray-700 transition text-xl`}
          // className="text-gray-400 hover:text-gray-700 transition text-xl"
        >
          <FontAwesomeIcon icon={faMapLocation} />
        </Link>
      </div>
    </div>
  );
};
