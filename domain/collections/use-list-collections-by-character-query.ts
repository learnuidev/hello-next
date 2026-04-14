import { siteConfig } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";

export const collectionsByCharacterQueryKey = "collections-by-character";

const listCollectionsByCharacter = async (
  characterId: string,
  opts: { Authorization: string },
): Promise<{ characterId: string; collectionIds: string[] }> => {
  const res = await fetch(
    `${siteConfig.apiUrlV2}/v1/collections/by-character/${encodeURIComponent(characterId)}`,
    {
      method: "GET",
      headers: {
        Authorization: `${opts?.Authorization}`,
      },
    },
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as any)?.message || "Failed to fetch collections");
  }

  return res.json();
};

export const useListCollectionsByCharacterQuery = (
  params: { characterId: string },
  options = {} as any,
) => {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery({
    queryKey: [
      collectionsByCharacterQueryKey,
      params.characterId,
      authUser?.jwt,
    ],
    enabled: !!authUser?.jwt && !!params.characterId,
    queryFn: async () => {
      const resp = await listCollectionsByCharacter(params.characterId, {
        Authorization: authUser?.jwt,
      });
      return resp;
    },
    ...options,
  });
};
