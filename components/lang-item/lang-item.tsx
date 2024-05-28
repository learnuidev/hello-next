"use client";
import React from "react";

// data
import { alphabetsDict } from "@/langs/alphabets-dict";

// hooks
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// components
import { LangPageView } from "./lang-page-view";
import { Icons } from "../ui/icons.v2";

export const useViewTypeStore = create(
  persist(
    (set: any, get: any) => ({
      view: "home",
      views: {},
      setViews: (charId: string, view: any) =>
        set({ views: { ...get().views, [charId]: view } }),
      setView: (view: any) => set({ view }),
    }),
    {
      name: "lang-tabs-store", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export function LangItem() {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "";

  const views = useViewTypeStore((state: any) => state.views) as any;
  const view = views?.[lang] || "words";
  const setViews = useViewTypeStore((state) => state.setViews);
  const setView = (view: any) => {
    return setViews(lang || "", view);
  };

  const alphabets = alphabetsDict?.[lang || ""];

  return (
    <div className="grow mb-32">
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
          <p className="text-[8px] p-0 m-0">Words</p>
        </button>
        <button
          onClick={() => {
            setView("sentences");
          }}
          className={`${
            view === "sentences" ? "dark:text-white" : "dark:text-gray-800"
          } my-4 flex flex-col items-center hover:dark:text-white transition`}
        >
          <Icons.tree className="text-2xl" />
          <p className="text-[8px] p-0 m-0">Sentences</p>
        </button>
      </div>

      <LangPageView view={view} />
    </div>
  );
}
