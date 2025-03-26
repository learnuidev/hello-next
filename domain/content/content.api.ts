"use client";

import { siteConfig } from "@/lib/config";
import { AddContentParams } from "./content.types";

const addContentApi = `${siteConfig.apiUrl}/v1/add-content`;

const addContent = async (
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

export const listContents = async (opts: { Authorization: string }) => {
  const res = await fetch(listContentsApi, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${opts?.Authorization}`,
    },
    body: JSON.stringify({}),
  });
  const resp = (await res.json()) as any;

  return resp;
};

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
  const resp = (await res.json()) as any;

  return resp;
};
