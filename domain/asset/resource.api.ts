"use client";

import {
  GetHtmlTextParams,
  GetHtmlTextSuccess,
  GetUploadUrlSuccess,
} from "./asset.types";

// TODO: Move this to .env
const apiUrl =
  "https://ocdi1u27uf.execute-api.us-east-1.amazonaws.com/dev/v1/get-html-text";

export const getHtmlText = async (
  { url, selector = "body", ai }: GetHtmlTextParams,
  opts: {
    Authorization: string;
  }
): Promise<GetHtmlTextSuccess> => {
  const res = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${opts?.Authorization}`,
    },
    body: JSON.stringify({
      url,
      selector,
      ai,
    }),
  });
  const resp = (await res.json()) as any;

  return resp;
};
