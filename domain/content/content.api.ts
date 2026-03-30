"use client";

import { siteConfig } from "@/lib/config";
import { AddContentParams } from "./content.types";

const addContentApi = `${siteConfig.apiUrl}/v1/add-content`;

export const addContent = async (
  params: AddContentParams,
  opts: {
    Authorization: string;
  }
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
  opts: { Authorization: string }
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
  words?: { id?: string; input?: string; start?: number; end?: number }[];
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
  opts: { Authorization: string }
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
      res.status === 404 ? "Content doesnt exist" : "Server error"
    );
  }
  const resp = (await res.json()) as any;

  return {
    ...resp,
    transcriptions: resp?.transcriptions?.map((transcription: any) => {
      if (!transcription?.start) {
        return {
          ...transcription,
          start: 0,
          end: 0,
        };
      }
      return transcription;
    }),
  } as IContent;
};
