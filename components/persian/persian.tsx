"use client";
import React from "react";

import { useState } from "react";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Icons } from "../ui/icons.v2";

import { ComponentItem } from "../component-item";
import { WordItem } from "../word-item";

import { persianAlphabets } from "@/langs/persian/persian-alphabets";
import { persianWords } from "@/langs/persian/persian-words";
import { persianComponents } from "@/langs/persian/persian-components";

const PageView = ({ view }: any) => {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "fa";

  switch (view) {
    case "alphabets":
      return (
        <>
          <div className="mx-4 my-4 md:mx-16 flex flex-wrap items-center justify-center">
            {persianAlphabets.map((prop) => {
              return (
                <Link
                  key={JSON.stringify(prop)}
                  href={
                    lang
                      ? `/nmm/${prop.input}?lang=${lang}`
                      : `/nmm/${prop.input}`
                  }
                  className={`${"dark:text-gray-500 text-gray-200"} dark:hover:text-white p-6 flex items-center flex-col`}
                >
                  <span className={`block text-sm dark:text-slate-600`}>
                    {prop?.roman}
                  </span>

                  <span className="text-4xl"> {prop.input}</span>
                </Link>
              );
            })}
          </div>
        </>
      );

    case "words":
      return (
        <>
          <div className="mx-4 my-4 md:mx-16 text-black dark:text-white flex flex-wrap items-center justify-between">
            {persianWords.map((prop: any) => {
              return (
                <WordItem
                  lang={lang}
                  component={prop}
                  key={JSON.stringify(prop)}
                />
              );
            })}
          </div>
        </>
      );
    case "components":
      return (
        <>
          <div className="mx-4 my-4 md:mx-16 flex flex-wrap items-end justify-center">
            {persianComponents.map((prop) => {
              return <ComponentItem lang={lang} component={prop} key={prop} />;
            })}
          </div>
        </>
      );

    default:
      return null;
  }
};

export function Persian() {
  const [view, setView] = useState("words");

  return (
    <div className="grow">
      <div className="dark:text-gray-500 my-4 space-x-8 flex justify-center items-center">
        <button
          onClick={() => {
            setView("alphabets");
          }}
          className={`${
            view === "alphabets" ? "dark:text-white" : "dark:text-gray-800"
          } my-4 flex flex-col items-center hover:dark:text-white transition`}
        >
          <Icons.pinyinChart className="text-2xl" />
          <p className="text-[8px] p-0 m-0">alphabets</p>
        </button>

        <button
          onClick={() => {
            setView("components");
          }}
          className={`${
            view === "components" ? "dark:text-white" : "dark:text-gray-800"
          } my-4 flex flex-col items-center hover:dark:text-white transition`}
        >
          <Icons.blockBrick className="text-2xl" />
          <p className="text-[8px] p-0 m-0">Components</p>
        </button>
        <button
          onClick={() => {
            setView("words");
          }}
          className={`${
            view === "words" ? "dark:text-white" : "dark:text-gray-800"
          } my-4 flex flex-col items-center hover:dark:text-white transition`}
        >
          <Icons.word className="text-2xl" />
          <p className="text-[8px] p-0 m-0">Words</p>
        </button>
      </div>

      <PageView view={view} />
    </div>
  );
}
