import { siteConfig } from "@/lib/config";
import { ListMeaningsResponse } from "./meanings.types";

export type UpdateMeaningResponse = ListMeaningsResponse & {
  updatedAt: string;
};

export type UpdateMeaningParams = any;

export const updateMeanings = async (
  params: any,
  opts: {
    Authorization: string;
  }
): Promise<UpdateMeaningResponse> => {
  const { id, ...rest } = params;
  const res = await fetch(`${siteConfig.apiUrl}/v1/list-meanings`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${opts?.Authorization}`,
    },
    body: JSON.stringify({
      id,
      ...rest,
    }),
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }
  const resp = (await res.json()) as UpdateMeaningResponse;

  return resp;
};
