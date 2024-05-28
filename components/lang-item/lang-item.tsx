"use client";
import React from "react";

import { useState } from "react";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Icons } from "../ui/icons.v2";

import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { WordsList } from "../words-list";
import { russianAlphabets } from "@/langs/russian/russian-alphabets";
import { russianWords } from "@/langs/russian/russian-words";
import { useListComponents } from "@/domain/lesson/component.queries";
import { wordsDict } from "@/langs/words-dict";
import { alphabetsDict } from "@/langs/alphabets-dict";
import { useQuery } from "@tanstack/react-query";
import { useSearchQueryStore } from "../search/state";
import { formatComponentName } from "@/app/nmm/format-component-name";

const useIsLearned = ({ characterId }: { characterId: string }) => {
  const { data } = useListCharactersQuery();

  return {
    data: data?.find((item: any) => item?.input === characterId),
  };
};

const AlphabetItem = ({ prop, lang }: any) => {
  const { data } = useIsLearned({ characterId: prop?.input });
  return (
    <Link
      key={JSON.stringify(prop)}
      href={lang ? `/nmm/${prop.input}?lang=${lang}` : `/nmm/${prop.input}`}
      className={`${data ? "dark:text-white" : "dark:text-gray-500 text-gray-200"} dark:hover:text-white p-6 flex items-center flex-col lowercase`}
    >
      <span
        className={`block text-sm ${data ? "dark:text-slate-300" : "dark:text-slate-600"}`}
      >
        {prop?.roman}
      </span>

      <span className="text-4xl"> {prop.input}</span>
      <span className="text-sm trim text-gray-600">
        {" "}
        {prop?.sound?.split(" ")?.[0]}
      </span>
    </Link>
  );
};

const useListDictionaryWords = (lang: string) => {
  const query = useSearchQueryStore((state) => state.query);

  const { data: characters } = useListCharactersQuery();
  const { data: components } = useListComponents();

  return useQuery({
    queryKey: ["list-dictionary-words", lang, query],
    queryFn: async () => {
      const dictionaryWords = wordsDict[lang];

      const dataToShow = dictionaryWords?.filter((item: any) => {
        if (!query) {
          return true;
        }

        const containsNativeText = (item?.input || item?.hanzi)?.includes(
          query?.toLowerCase()
        );
        const containsEnText = item?.en?.includes(query?.toLowerCase());
        const containsRomanText = item?.roman?.includes(query?.toLowerCase());
        return containsNativeText || containsEnText || containsRomanText;
      });

      return dataToShow?.map((prop: any) => {
        const character = [...(characters || []), ...(components || [])]
          ?.filter(
            (char: any) =>
              (char?.input || char?.hanzi) === (prop?.input || prop?.hanzi)
          )
          ?.find((item) => item?.en);

        return {
          ...prop,
          ...character,
          input: prop.input || prop?.hanzi,
          roman:
            prop?.roman ||
            character?.roman ||
            character?.pinyin ||
            prop?.pinyin,

          en: formatComponentName({ en: character?.en || prop.en }, 1),
        };
      });
      // return dictionaryWords;
    },
  });
};

const PageView = ({ view }: any) => {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "";

  const { data: dictionaryWords } = useListDictionaryWords(lang);

  const { data } = useListCharactersQuery();
  const { data: comps } = useListComponents();

  const words = [...(comps || []), ...(data || [])]
    ?.filter((item: any) => item?.lang === lang)
    ?.filter((item: any) => (item?.input || item?.hanzi)?.length < 20);

  console.log("filtered components", words);
  const alphabets = alphabetsDict?.[lang || ""];

  switch (view) {
    case "alphabets":
      return (
        <>
          <div className="mx-4 my-4 md:mx-16 flex flex-wrap items-center justify-center">
            {alphabets.map((prop: any) => {
              return <AlphabetItem lang={lang} prop={prop} key={prop?.input} />;
            })}
          </div>
        </>
      );

    case "dictionary":
      return <WordsList showWords={true} words={dictionaryWords} lang={lang} />;
    case "words":
      return <WordsList showWords={true} words={words} lang={lang} />;

    default:
      return null;
  }
};

export function LangItem() {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");
  const [view, setView] = useState("words");

  const alphabets = alphabetsDict?.[lang || ""];

  return (
    <div className="grow">
      <div className="dark:text-gray-500 my-4 space-x-8 flex justify-center items-center">
        {alphabets?.length > 0 && (
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
        )}
        <button
          onClick={() => {
            setView("dictionary");
          }}
          className={`${
            view === "dictionary" ? "dark:text-white" : "dark:text-gray-800"
          } my-4 flex flex-col items-center hover:dark:text-white transition`}
        >
          <Icons.book className="text-2xl" />
          <p className="text-[8px] p-0 m-0">dictionary</p>
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
          <p className="text-[8px] p-0 m-0">Learned Words</p>
        </button>
      </div>

      <PageView view={view} />
    </div>
  );
}
