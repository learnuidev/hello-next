import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useGetComponentQuery } from "@/domain/lesson/use-get-component-query";
import { cn } from "@/lib/utils";

import { useSetIfExists } from "@/app/(auth)/convos/[content-id]/hooks/use-character-context-store";
import { useSpeak } from "@/app/(auth)/convos/_play/use-speak";
import { getStatusIcon } from "@/app/(auth)/insights/insights-v2/precision-insight-view/status-icons";
import { useGetComponentId } from "@/app/nmm/[component-id]/use-get-component-id";
import { BookmarkButton } from "@/app/nmm/bookmark-button";
import { useIsSuperAdmin } from "@/domain/auth/auth.queries";
import { useListComponentVariantsQuery } from "@/domain/component/list-component-variants";
import { useListMeaningsQuery } from "@/domain/sentence/meaning.queries";
import { useUpdateMeaningMutation } from "@/domain/sentence/use-update-meaning-mutation";
import { useGetCharacter } from "@/hooks/use-get-character";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useBrightModeStore } from "../settings-dialog/use-bright-mode-store";

import { Icons } from "../ui/icons.v2";
import { smartSplit } from "../youtube-page/utils/smart-split";
import { AudioComponent } from "./audio-component";
import { CharacterItem } from "./character-item";
import { characterStore } from "./character-store";
import { CharacterTrackButton } from "./selected-character/character-track-button";
import { useCharacterEditStore } from "./use-character-edit-store";
import { isNonRomanLang } from "./utils/is-non-roman-lang";
import { useYoutubeVideoUrl } from "../summary/with-youtube-video";
import { useGetAudioQuery } from "@/hooks/use-get-audio-query";

export const CharacterTitle = (props: any) => {
  const {
    lang,
    multiSentence,
    characterId,
    selectedCompInput: selectedCompInput2,
  } = props;
  const { data: learnedCharacters2, isLoading: isCharactersLoading } =
    useListCharactersQuery();
  const searchParams = useSearchParams();

  const isSuperAdmin = useIsSuperAdmin();

  const [newPinyin, setNewPinyin] = useState("");
  const [newEn, setNewEn] = useState("");

  const context = searchParams?.get("context");

  const pinyinInput = characterStore((state) => state.pinyin);

  const setEdit = useCharacterEditStore((state) => state.setEdit);
  const edit = useCharacterEditStore((state) => state.edit);

  const componentId = useGetComponentId();

  const { data } = useListComponentVariantsQuery({ hanzi: characterId });

  const character = useGetCharacter({ characterId: componentId });

  const pinyins = data?.map((val) => val?.pinyin) || [];
  const englishMeanings = data?.map((val) => val?.en) || [];

  const { speak } = useSpeak(lang);

  const { data: selectedComp } = useGetComponentQuery({
    hanzi: componentId,
  });

  const { data: meaning, isLoading } = useListMeaningsQuery({
    content: componentId,
    lang,
  });

  const updateMeaningMutation = useUpdateMeaningMutation();

  const { videoUrl, setVideoUrl, addVideoUrl, setAddVideoUrl } =
    useYoutubeVideoUrl();

  const selectedCompInput = characterId;

  const StatusIcon = getStatusIcon(character?.status);
  const showPinyin = useBrightModeStore((state: any) => state.showPinyin);

  const finalEnVal =
    englishMeanings?.length === 1
      ? meaning?.details?.en || englishMeanings?.[0] || selectedComp?.en
      : meaning?.details?.en || selectedComp?.en || englishMeanings?.[0];

  const selectedPinyin = pinyins?.length
    ? pinyins?.join("/")
    : pinyins?.[0] ||
      pinyinInput ||
      selectedComp?.pinyin ||
      meaning?.details?.pinyin;

  const setIfExists = useSetIfExists();

  const { data: audio, isLoading: isAudioLoading } = useGetAudioQuery({
    text: selectedCompInput,
    lang,
  });

  return (
    <div className="flex flex-col items-start space-y-2 w-full">
      {edit && meaning?.id && isSuperAdmin ? (
        <input
          value={newPinyin || meaning?.details?.pinyin}
          onChange={(event: any) => {
            setNewPinyin(event?.target.value);
          }}
          className="text-gray-900 dark:text-gray-400  font-light focus-visible:ring-0 focus-visible:ring-transparent w-full"
        />
      ) : showPinyin && isNonRomanLang(lang || meaning?.lang) ? (
        pinyins?.length > 1 ? (
          <h2 className="text-gray-900 dark:text-gray-400  font-extralight">
            {pinyins?.map((pinyin, i, ctx) => {
              return (
                <Link
                  href={`/nmm/${characterId}?lang=zh&variant=${pinyin}`}
                  className=""
                  key={pinyin}
                >
                  {pinyin}
                  {ctx?.length - 1 !== i ? "; " : ""}
                </Link>
              );
            })}
          </h2>
        ) : (
          <h2 className="text-gray-900 dark:text-gray-400  font-light focus-visible:ring-0 focus-visible:ring-transparent w-full">
            {pinyins?.[0] ||
              pinyinInput ||
              selectedComp?.pinyin ||
              meaning?.details?.pinyin ||
              meaning?.details?.roman}
          </h2>
        )
      ) : null}

      {(lang || meaning?.lang) === "zh" ? (
        <div className="flex justify-between items-center w-full">
          <div>
            {smartSplit({ input: selectedCompInput, lang })?.map(
              (item: string, idx: number) => {
                return (
                  <Link
                    className={
                      selectedCompInput?.length < 4 ? "text-5xl" : "text-2xl"
                    }
                    key={`character-title-${item}-${idx}-${idx}`}
                    href={`/nmm/${item}?lang=zh${context ? `&context=${context}` : ""}`}
                  >
                    <CharacterItem
                      className={
                        selectedCompInput?.length < 8
                          ? "lg:text-4xl text-4xl"
                          : "text-2xl"
                      }
                      // disableForgotten
                      character={item}
                    />
                  </Link>
                );
              }
            )}
          </div>

          <div>
            {selectedCompInput?.length < 4 && (
              <StatusIcon.Icon className="text-2xl" />
            )}
          </div>
        </div>
      ) : lang === "zh" && multiSentence ? (
        <h1 className="text-xl my-0 py-0 font-extralight">
          {selectedCompInput}
        </h1>
      ) : (
        <h1
          className={cn(
            selectedCompInput?.length < 16 ? "text-2xl md:text-4xl" : "text-xl",
            "my-0 py-0 font-extralight"
          )}
        >
          {/* {selectedCompInput} */}
        </h1>
      )}

      {edit && meaning?.id && isSuperAdmin ? (
        <input
          value={newEn || meaning?.details?.en}
          onChange={(event: any) => {
            setNewEn(event?.target.value);
          }}
          className="text-gray-900 dark:text-gray-400  font-light focus-visible:ring-0 focus-visible:ring-transparent w-full"
        />
      ) : (
        <h2 className="dark:text-gray-500 text-gray-900 font-light">
          {finalEnVal?.split("/")?.slice(0, 4)?.join("/")}
        </h2>
      )}

      <div className="space-x-4 flex items-center">
        {isAudioLoading ? (
          <Icons.spinner className="text-2xl" spinPulse />
        ) : audio?.audioUrl ? (
          <AudioComponent
            audioUrl={audio?.audioUrl}
            key={JSON.stringify(audio?.audioUrl)}
            currentPhrase={selectedCompInput}
            icon={<Icons.volume className="text-2xl" />}
          />
        ) : (
          !edit && (
            <button
              onClick={() => {
                speak(selectedCompInput);
              }}
            >
              <Icons.volume className="text-2xl" />
            </button>
          )
        )}
        {!edit && <CharacterTrackButton />}
        {!edit && (
          <BookmarkButton
            hanzi={characterId}
            lang={lang}
            en={finalEnVal}
            pinyin={selectedPinyin}
          />
        )}

        {edit && meaning?.id && isSuperAdmin ? (
          <div className="space-x-4">
            <button
              disabled={updateMeaningMutation.isPending}
              onClick={() => {
                updateMeaningMutation
                  // @ts-ignore
                  .mutateAsync({
                    id: meaning?.id,
                    details: {
                      ...meaning?.details,
                      pinyin: newPinyin || meaning?.details?.pinyin,
                      en: newEn || meaning?.details?.en,
                    },
                  })
                  .then((resp) => {
                    setEdit(false);
                  });
              }}
            >
              Save
            </button>

            <button
              onClick={() => {
                setEdit(false);
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          meaning?.id &&
          isSuperAdmin && (
            <button
              onClick={() => {
                setEdit(true);
              }}
            >
              <Icons.edit className="text-xl" />{" "}
            </button>
          )
        )}

        {isSuperAdmin && (
          <button
            onClick={() => {
              setAddVideoUrl((prev: boolean) => !prev);
            }}
          >
            <Icons.youtube className="text-xl" />
          </button>
        )}
      </div>
    </div>
  );
};
