import { siteConfig } from "@/lib/config";
import { useMutation } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { AddContentParams } from "./content-v2.types";
import { ContentV2 } from "../content-v2/content-v2.types";

const addContentsApi = async (
  params: AddContentParams,
  opts: { Authorization: string }
) => {
  const url = `${siteConfig.contentApi}/v1/contents`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${opts?.Authorization}`,
    },

    body: JSON.stringify(params),
  });
  const resp = (await res.json()) as ContentV2;

  return resp;
};

export const useAddContentV2Mutation = () => {
  const { data: authUser } = useCurrentAuthUser({});

  return useMutation({
    mutationFn: async (params: AddContentParams) => {
      return await addContentsApi(params, { Authorization: authUser?.jwt });
    },
  });
};
