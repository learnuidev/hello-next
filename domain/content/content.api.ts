"use client";

import { siteConfig } from "@/lib/config";
import { AddContentParams } from "./content.types";
import { TranscriptionWord } from "@/components/_select-character/selected-character/tweet-page/tweet-page";
import {
  createSegmentPinyin,
  getPinyin,
  pickPinyinSource,
  segmentText,
} from "@/libs/utils/segment-text";
import { fetchWithToken } from "@/libs/cognito/fetch-with-token";

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

export const listContents = async ({
  key,
  contentIds,
}: {
  key?: any;
  contentIds?: string[];
}) => {
  const res = await fetchWithToken(listContentsApi, {
    method: "POST",
    body: JSON.stringify({
      key,
      contentIds,
      limit: 100,
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

  backgroundImageId?: string;
  backgroundImageUrl?: string;
  coverPhotoId?: string;
  coverPhotoUrl?: string;
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
        const transcriptionText =
          transcription?.hanzi || transcription?.input || "";
        // The transcription already carries the pinyin of the whole line: the
        // words take their reading from it rather than being read word by word,
        // where a word on its own reads wrong (了 as `liǎo`, 行 as `xíng`).
        const originalPinyin = pickPinyinSource(
          transcription?.pinyin,
          transcription?.roman,
        );

        const segmentedText = await segmentText({
          text: transcriptionText,
          lang: resp?.lang,
          originalPinyin,
        });

        const pinyinParser = createSegmentPinyin({
          text: transcriptionText,
          lang: resp?.lang,
          originalPinyin,
        });

        const transcriptionWords = (transcription?.words || segmentedText).map(
          (word: any) => {
            const wordInput = word?.input || word?.hanzi || "";

            return {
              ...word,
              pinyin: pinyinParser
                ? pinyinParser.getPinyin(wordInput, word?.startIndex)
                : getPinyin(wordInput),
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
