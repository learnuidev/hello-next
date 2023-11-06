"use client";
import { queryIds } from "./queryIds";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { AddContentParams } from "./content.types";

// TODO: Move this to .env
const addContentApi =
  "https://ocdi1u27uf.execute-api.us-east-1.amazonaws.com/dev/v1/add-content";

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

import { useQuery } from "@tanstack/react-query";

// TODO: Move this to .env
const listContentsApi =
  "https://ocdi1u27uf.execute-api.us-east-1.amazonaws.com/dev/v1/list-contents";

export const listContents = async (opts: { Authorization: string }) => {
  const res = await fetch(listContentsApi, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${opts?.Authorization}`,
    },
  });
  const resp = (await res.json()) as any;

  return resp;
};
