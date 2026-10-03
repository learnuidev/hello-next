"use client";

import {
  ListDiscoveryResponse,
  useListDiscoveryMutation,
} from "@/domain/sentence/use-list-discovery-query";
import { useEffect, useRef } from "react";
import { create } from "zustand";

/** A line of the text, and the language it is in. */
export interface ReaderLine {
  content: string;
  lang: string;
}

/**
 * Translation in the reader.
 *
 * The line on screen is asked about as it arrives. `/v1/list-discovery` is the
 * app's own way of asking what a sentence means, and while reading line by line
 * the reader wants to know for every line it puts in the middle of the frame —
 * so there is nothing to press: the translation is simply there by the time the
 * eye is ready for it.
 *
 * The lookups are mutations rather than queries (see `useListDiscoveryMutation`)
 * because they are asked for by an event — the line changing — and never by a
 * mount. Each answer is kept against the line it was asked about, so going back
 * through a text shows what the server already said instead of asking it again
 * for a sentence it has already read.
 */
export const useReaderTranslateStore = create((set: any) => ({
  /** The line on screen, put here by the view. */
  activeLine: null as ReaderLine | null,
  /** Every answer we have been given, by the line it is about. */
  answers: {} as Record<string, ListDiscoveryResponse>,

  setActiveLine: (activeLine: ReaderLine | null) => set({ activeLine }),

  remember: (content: string, answer: ListDiscoveryResponse) =>
    set((state: any) => ({
      answers: { ...state.answers, [content]: answer },
    })),
}));

/**
 * The view half: the line on screen is published as it changes, asked about on
 * its own, and the answer handed back — never another line's.
 */
export const useReaderTranslation = ({ content, lang }: ReaderLine) => {
  const setActiveLine = useReaderTranslateStore(
    (state: any) => state.setActiveLine,
  );
  const remember = useReaderTranslateStore((state: any) => state.remember);
  const answers = useReaderTranslateStore((state: any) => state.answers);

  // Lines asked about and not yet answered: coming back to a line whose lookup
  // is still in the air should not ask a second time.
  const inFlight = useRef<Set<string>>(new Set());

  const { mutate } = useListDiscoveryMutation({ retry: 2 });

  useEffect(() => {
    setActiveLine(content ? { content, lang } : null);
  }, [content, lang, setActiveLine]);

  /**
   * The lookup itself, on the line that is on screen.
   *
   * It is skipped when the answer is already known, and when this line's answer
   * is still on its way — stepping back and forth through a text should cost
   * nothing. A failed lookup is deliberately not retried from here: the effect
   * runs because the line changed, and a failure does not change the line, so
   * there is no loop to get into — stepping away and back asks again.
   */
  useEffect(() => {
    if (!content || answers[content] || inFlight.current.has(content)) {
      return;
    }

    inFlight.current.add(content);

    mutate(
      { content, lang },
      {
        onSuccess: (answer) => {
          remember(content, answer);
        },
        onSettled: () => {
          inFlight.current.delete(content);
        },
      },
    );
  }, [content, lang, answers, mutate, remember]);

  return {
    translation: answers[content] || null,
  };
};

/**
 * The dock half: the answer for whatever line the view has put on screen.
 *
 * The dock does not ask for anything — asking belongs to the view, which is the
 * one that knows what the line is. It only needs to know whether a translation
 * has arrived, because that is what hands over the C (chinglish) and E
 * (english) switches, which are that translation's own.
 */
export const useReaderTranslateAnswer = () => {
  const activeLine = useReaderTranslateStore(
    (state: any) => state.activeLine,
  );
  const answers = useReaderTranslateStore((state: any) => state.answers);

  return {
    translation: answers[activeLine?.content] || null,
  };
};
