"use client";

import {
  ListDiscoveryResponse,
  useListDiscoveryQuery,
} from "@/domain/sentence/use-list-discovery-query";
import { useEffect } from "react";
import { create } from "zustand";

/**
 * Translation in the reader.
 *
 * `translateOn` is the sidebar's Translate button: until it is pressed nothing
 * is asked for. The line on screen is fetched through `/v1/list-discovery`
 * (the app's own way of asking what a sentence means) and the answer is kept
 * here, because the button that starts the lookup lives in the sidebar while
 * the line it is about lives in the view.
 */
export const useReaderTranslateStore = create((set: any, get: any) => ({
  translateOn: false,
  translation: null as ListDiscoveryResponse | null,
  isLoading: false,

  toggleTranslate: () => {
    const translateOn = !get().translateOn;

    set({
      translateOn,
      // Switching it off puts the translations away with it.
      ...(translateOn ? {} : { translation: null }),
    });
  },

  setTranslation: (translation: ListDiscoveryResponse | null) =>
    set({ translation }),

  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}));

/**
 * The translation of one line, asked for only once translate is on, and shared
 * with the sidebar (which is what shows the C and E buttons).
 */
export const useReaderTranslation = ({
  content,
  lang,
}: {
  content: string;
  lang: string;
}) => {
  const translateOn = useReaderTranslateStore((state) => state.translateOn);
  const setTranslation = useReaderTranslateStore(
    (state) => state.setTranslation,
  );
  const setIsLoading = useReaderTranslateStore((state) => state.setIsLoading);

  const { data, isLoading } = useListDiscoveryQuery(
    { content, lang },
    { enabled: translateOn && !!content },
  );

  useEffect(() => {
    setTranslation(data || null);
  }, [data, setTranslation]);

  useEffect(() => {
    setIsLoading(translateOn && isLoading);
  }, [isLoading, translateOn, setIsLoading]);

  return { translation: data || null, isLoading, translateOn };
};
