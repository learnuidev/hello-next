"use client";

import { siteConfig } from "@/lib/config";
import { AddContentParams } from "./content.types";
import { TranscriptionWord } from "@/components/_select-character/selected-character/tweet-page/tweet-page";
import { getPinyin, segmentText } from "@/libs/utils/segment-text";

const addContentApi = `${siteConfig.apiUrl}/v1/add-content`;

export const addContent = async (
  params: AddContentParams,
  opts: {
    Authorization: string;
  },
) => {
  const res = await fetch(addContentApi, {
    method: "POST",
    headers: {
      Authorization: `${opts?.Authorization}`,
    },
    body: JSON.stringify(params),
  });
  const resp = await res.json();
  return resp;
};

const listContentsApi = `${siteConfig.apiUrl}/v1/list-contents`;

export const listContents = async (
  { key, contentIds }: { key?: string; contentIds?: string[] },
  opts: { Authorization: string },
) => {
  const res = await fetch(listContentsApi, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${opts?.Authorization}`,
    },
    body: JSON.stringify({
      key,
      contentIds,
    }),
  });
  const resp = (await res.json()) as any;

  return resp;
};

interface ContentChapter {
  title: string;
  input: string;
  roman: string;
  lit: string;
  hanzi?: string;
  pinyin?: string;
  id?: string;
  en?: string;
}

export interface ContentTranscription {
  hanzi: string;
  start: number;
  end: number;
  id: string;
  input: string;
  roman: string;
  pinyin: string;
  lang: string;
  sentence?: string;
  en: string;
  chinglish?: string;
  words?: TranscriptionWord[];
}

export interface IContent {
  id: string;
  title: string;
  description: string;
  author: string;
  lang: string;
  audio: string; // audio url, can be youtube url, mp3, mp4
  userId: string;
  chapters: ContentChapter[];
  transcriptions: ContentTranscription[];
}

export const getContent = async (
  params: { contentId: string },
  opts: { Authorization: string },
) => {
  const res = await fetch(`${siteConfig.apiUrl}/v1/get-content`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${opts?.Authorization}`,
    },

    body: JSON.stringify(params),
  });

  if (!res.ok) {
    throw new Error(
      res.status === 404 ? "Content doesnt exist" : "Server error",
    );
  }
  const resp = (await res.json()) as any;

  return {
    ...resp,
    transcriptions: await Promise.all(
      resp?.transcriptions?.map(async (transcription: any) => {
        const segmentedText = await segmentText({
          text: transcription?.hanzi || transcription?.input,
          lang: resp?.lang,
        });

        const transcriptionWords = (transcription?.words || segmentedText).map(
          (word: any) => {
            return {
              ...word,
              pinyin: getPinyin(word?.input || ""),
            };
          },
        );
        if (!transcription?.start) {
          return {
            ...transcription,
            words: transcriptionWords,
            start: 0,
            end: 0,
          };
        }
        return { ...transcription, words: transcriptionWords };
      }),
    ),
  } as IContent;
};
