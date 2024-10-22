"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useEffect } from "react";
import { Summary } from "../summary";
import { Icons } from "../ui/icons.v2";
import { GrammarAnalysis } from "../grammar-analysis";
import { SelectedCharacterProps } from "./select-character.types";
import { CharacterSentences } from "./character-sentences";

import { AudioComponent } from "./audio-component";
import { useShowsStore, WordItem } from "../word-item";

import { SubComponentsView } from "./subcomponents-view";

import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useStoryStore } from "./story-store";
import { StoryEditor } from "./story-editor";

import { chineseCharacters } from "@/langs/chinese /characters";
import { useQuery } from "@tanstack/react-query";
import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { siteConfig } from "@/lib/config";

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
  return useQuery({
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

export const StoryView = (props: SelectedCharacterProps) => {
  const {
    uniqueAnswerIds,
    answerMap,
    allContents,
    allSteps,
    components,
    selectedComp,
    selectedChar,
    routeName,
    lang,
    view,
    sentences,
    characterId,
    selectedComp2,
  } = props;

  const selected = selectedComp2 || selectedComp;

  console.log("SELECTED COMP", selectedComp2);

  const level = selectedComp?.level || selectedComp2?.level;
  const toneLevel = selectedComp?.tone_level || selectedComp2?.tone_level;
  const initial = selectedComp?.initial || selectedComp2?.initial;
  const final = selected?.final || selectedComp2?.final;
  const { data } = useListCharactersQuery();

  const offlineCharacter = chineseCharacters?.find(
    (char) => char?.hanzi === characterId || char?.input === characterId
  );

  const { data: componentWithStory } = useGenStoryQuery(
    {
      hanzi: characterId,
      lang,
      options: {},
    },
    {
      enabled: selectedComp2 && !Boolean(selectedComp2?.story),
    }
  );

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
      <div>
        {/* {selectedChar?.length > 3 && ( */}
        <div className="flex items-center justify-between mb-8 mt-4 mr-0 sm:mr-32">
          <div className="flex flex-col items-start space-y-2">
            <h2 className="text-gray-400 font-extralight">{pinyinOrRoman}</h2>

            <h1 className="text-4xl my-0 py-0 font-extralight">
              {selectedComp?.hanzi || selectedChar}
            </h1>

            <h2 className="text-gray-500 font-light">{selectedCompEn}</h2>
          </div>

          {level && (
            <div className="text-slate-500  text-extralight flex space-x-2 items-center">
              <Icons.earthAsia />
              <p>{level}</p>
            </div>
          )}

          {selectedComp?.audio ? (
            <AudioComponent currentPhrase={selectedComp} />
          ) : null}
        </div>
        {/* )} */}

        {/* <p>{JSON.stringify(selectedComp2, null, 2)}</p> */}

        {selected && (
          <div className="font-light flex space-x-4 items-center text-gray-400 mb-2">
            {toneLevel && (
              <div className="flex space-x-2 items-center">
                <Icons.musicNote />
                <p>{toneLevel}</p>
              </div>
            )}
            {initial && (
              <div className="flex space-x-2 items-center">
                <p>initial - </p>
                <p>{initial}</p>
              </div>
            )}
            {final && (
              <div className="flex space-x-2 items-center">
                <p>final - </p>
                <p>{final}</p>
              </div>
            )}
          </div>
        )}

        <SubComponentsView lang={lang} characterId={characterId} />

        <div>
          <StoryEditor
            selectedChar={selectedComp}
            story={selectedComp2?.story || componentWithStory?.story}
          />
        </div>
      </div>
    </div>
  );
};
