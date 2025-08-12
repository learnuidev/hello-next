import { siteConfig } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";

export const listCharacterContentsQueryKey = "list-character-contents";

interface ListCharacterContentsQuery {
  content?: string;
  fetchType: "content" | "user";
}

type ImageDetail = {
  en: string;
  hanzi: string;
  pinyin: string;
};

type ImageMetadata = {
  createdAt: number;
  details: ImageDetail[];
};

type CharacterContents = {
  content: string;
  imageMetadata: ImageMetadata;
  userIdAndContent: string;
  userId: string;
  updatedAt: number;
  extension: string;
  createdAt: number;
  uploadBucketKey: string;
  id: string;
  name: string;
  contentType: string;
  sourceUrl: string;
};

const listCharacterContentsApi = async (
  params: ListCharacterContentsQuery,
  authUser: { jwt: string }
): Promise<CharacterContents[]> => {
  const res = await fetch(`${siteConfig.apiUrlV2}/v1/list-character-contents`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authUser?.jwt}`,
    },
    body: JSON.stringify(params),
  });
  const resp = await res.json();

  return resp;
};

export const useListCharacterContentsQuery = (
  params: ListCharacterContentsQuery
) => {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery({
    queryKey: [listCharacterContentsQueryKey, params.content, params.fetchType],
    queryFn: async () => {
      const resp = await listCharacterContentsApi(params, {
        jwt: authUser.jwt,
      });
      return resp?.sort((a, b) => b?.createdAt - a?.createdAt);
    },
  });
};

siteConfig;
