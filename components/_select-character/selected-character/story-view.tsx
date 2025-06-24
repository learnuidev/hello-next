"use client";

import { Icons } from "@/components/ui/icons.v2";
import { useEffect } from "react";

import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { StoryEditor } from "./story-editor";
import { useStoryStore } from "./story-store";

import {
  useCurrentAuthUser,
  useIsSuperAdmin,
} from "@/domain/auth/auth.queries";

import { useSelectedCharacterData } from "@/components/use-selected-character";
import { useListChineseCharactersQuery } from "@/domain/hsk/list-chinese-characters-query";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { create } from "zustand";

const genStoryApi = async (
  { hanzi, lang, options }: { hanzi: string; lang: string; options: any },
  { jwtToken }: { jwtToken: string }
) => {
  const res = await fetch(`${siteConfig?.apiUrl}/v1/gen-story`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },

    body: JSON.stringify({
      hanzi,
      lang,
      options,
    }),
  });
  const resp = (await res.json()) as {
    story: string;
  };

  return resp;
};

const useGenStoryQuery = (
  {
    hanzi,
    lang,
    options,
  }: {
    hanzi: string;
    lang: string;
    options: any;
  },
  { enabled }: { enabled: boolean }
) => {
  const { data: authUser } = useCurrentAuthUser({});
  return useQuery<any, any, any>({
    queryKey: ["gen-story", authUser?.jwt, hanzi],
    retry: false,

    queryFn: async () => {
      if (
        Boolean(authUser?.jwt) &&
        lang === "zh" &&
        hanzi?.length === 1 &&
        enabled
      ) {
        const resp = genStoryApi(
          { hanzi: hanzi, lang, options },
          { jwtToken: authUser?.jwt }
        );

        return resp;
      }
    },

    enabled:
      enabled && Boolean(authUser?.jwt) && lang === "zh" && hanzi?.length === 1,
  });
};

export const useStoryModeStore = create((set: any) => ({
  storyMode: "your-story",
  setStoryMode: (f: any) => set({ storyMode: f }),
}));

export const StoryView = ({ characterId }: { characterId: string }) => {
  const { data: characterData } = useSelectedCharacterData({ characterId });

  const { selectedComp, selectedChar, lang, selectedComp2 } = characterData;

  // const [storyMode, setStoryMode] = useState("global");
  const storyMode = useStoryModeStore((state) => state.storyMode);
  const setStoryMode = useStoryModeStore((state) => state.setStoryMode);
  const story = useStoryStore((state: any) => state.story);

  const selected = selectedComp2 || selectedComp;

  const level = selectedComp?.level || selectedComp2?.level;
  const toneLevel = selectedComp?.tone_level || selectedComp2?.tone_level;
  const initial = selectedComp?.initial || selectedComp2?.initial;
  const final = selected?.final || selectedComp2?.final;
  const { data } = useListCharactersQuery();

  const { data: chineseCharacters } = useListChineseCharactersQuery();

  const offlineCharacter = chineseCharacters?.find(
    (char: any) => char?.hanzi === characterId || char?.input === characterId
  );

  const { data: componentWithStory } = useGenStoryQuery(
    {
      hanzi: characterId,
      lang,
      options: {},
    },
    {
      enabled: true,
    }
  );

  const isSuperAdmin = useIsSuperAdmin();

  const pinyinOrRoman =
    selectedComp?.pinyin ||
    selectedComp?.roman ||
    selectedComp2?.pinyin ||
    selectedComp2?.roman ||
    offlineCharacter?.pinyin ||
    offlineCharacter?.roman;
  const selectedCompEn =
    selectedComp?.en || selectedComp2?.en || offlineCharacter?.en;

  const setStory = useStoryStore((state: any) => state.setStory);

  useEffect(() => {
    if (selectedComp?.story) {
      setStory(selectedComp?.story);
    }
  }, [selectedComp?.story, setStory]);

  return (
    <div>
      <div className="space-x-4 my-8">
        <button
          className={cn(
            storyMode === "your-story" ? "text-white" : "text-gray-400",
            "space-x-2"
          )}
          onClick={() => {
            setStoryMode("your-story");
          }}
        >
          <Icons.book />

          <span>Your Story</span>
        </button>

        {isSuperAdmin && (
          <button
            className={cn(
              storyMode === "global" ? "text-white" : "text-gray-400",
              "space-x-2"
            )}
            onClick={() => {
              setStoryMode("global");
            }}
          >
            <Icons.globeAsia />
            <span>Hanzi Hero</span>
          </button>
        )}
      </div>

      {storyMode === "global" && isSuperAdmin ? (
        <div key="global">
          <StoryEditor
            disableSave={true}
            key={componentWithStory?.story}
            selectedChar={selectedComp}
            story={componentWithStory?.story}
          />
        </div>
      ) : (
        <div key="your-story">
          <StoryEditor
            key={selectedComp2?.story}
            selectedChar={selectedComp}
            story={story}
          />
        </div>
      )}
    </div>
  );
};
