"use client";

import {
  ListDiscoveryResponse,
  useListDiscoveryMutation,
} from "@/domain/sentence/use-list-discovery-query";
import { useEffect } from "react";
import { create } from "zustand";

/** A line of the text, and the language it is in. */
export interface ReaderLine {
  content: string;
  lang: string;
}

/**
 * Translation in the reader.
 *
 * The lookup is a mutation and the Translate button in the dock is the only
 * thing that fires it: a line going by asks for nothing. `/v1/list-discovery`
 * is the app's own way of asking what a sentence means, and the answer is kept
 * here together with the line it is about — the button that asks lives in the
 * dock while the line it is asking about lives in the view, so the line has to
 * be carried across, and a translation can never be shown against a line other
 * than the one it was asked about.
 */
export const useReaderTranslateStore = create((set: any) => ({
  /** The line on screen, put here by the view. */
  activeLine: null as ReaderLine | null,
  /** The answer, and the line it belongs to. */
  translation: null as ListDiscoveryResponse | null,
  translatedContent: "",

  /**
   * A new line is a new question. The answer that was on the table was the last
   * line's, so it goes away with it — and with it goes the fact that this line
   * has been asked about, which is what brings the Translate button back.
   */
  setActiveLine: (activeLine: ReaderLine | null) =>
    set((state: any) => ({
      activeLine,
      ...(activeLine?.content === state.translatedContent
        ? {}
        : { translation: null, translatedContent: "" }),
    })),

  setTranslation: (
    content: string,
    translation: ListDiscoveryResponse | null,
  ) => set({ translatedContent: content, translation }),
}));

/**
 * The view half of it: the line on screen is published as it changes — so the
 * dock's button knows what it would be asking about — and the translation
 * handed back is that line's, or nothing at all.
 *
 * Nothing is asked of the server here. That is the button's job.
 */
export const useReaderTranslation = ({ content, lang }: ReaderLine) => {
  const setActiveLine = useReaderTranslateStore(
    (state: any) => state.setActiveLine,
  );
  const translation = useReaderTranslateStore(
    (state: any) => state.translation,
  );
  const translatedContent = useReaderTranslateStore(
    (state: any) => state.translatedContent,
  );

  useEffect(() => {
    setActiveLine(content ? { content, lang } : null);
  }, [content, lang, setActiveLine]);

  return {
    translation: translatedContent === content ? translation : null,
  };
};

/**
 * The button half: the Translate button of the dock, and the only place the
 * lookup is ever asked for.
 *
 * One click asks about the line on screen. The button is there to make the
 * request, so a successful discovery takes it away — the translation is on the
 * table and the C and E switches are what you work with from then on, until
 * the next line puts the question back.
 */
export const useReaderTranslateButton = () => {
  const activeLine = useReaderTranslateStore((state: any) => state.activeLine);
  const translation = useReaderTranslateStore(
    (state: any) => state.translation,
  );
  const translatedContent = useReaderTranslateStore(
    (state: any) => state.translatedContent,
  );
  const setTranslation = useReaderTranslateStore(
    (state: any) => state.setTranslation,
  );

  const { mutate, isPending, variables } = useListDiscoveryMutation();

  // What is on the table is this line's answer, and only this line's. This is
  // what a successful discovery looks like.
  const translated =
    !!translation &&
    !!activeLine?.content &&
    translatedContent === activeLine.content;

  const translateLine = () => {
    const line = activeLine;

    if (!line?.content) {
      return;
    }

    mutate(line, {
      onSuccess: (data) => {
        // If the reader has moved on while the answer was on its way, the
        // answer belongs to a line that is no longer on screen: it is dropped
        // rather than put on the table as this line's meaning.
        if (
          useReaderTranslateStore.getState().activeLine?.content !== line.content
        ) {
          return;
        }

        setTranslation(line.content, data);
      },
    });
  };

  return {
    // Nothing to translate is nothing to show: the dock keeps the button while
    // there is no answer for the line on screen.
    translation: translated ? translation : null,
    // Asking is the only thing the button can be doing: an answer that has
    // landed takes the button away, so the spinner never outlives it either.
    isLoading: isPending && variables?.content === activeLine?.content,
    translateLine,
  };
};
