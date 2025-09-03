import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useGetComponentQuery } from "@/domain/lesson/use-get-component-query";

import { useSetIfExists } from "@/app/(auth)/convos/[content-id]/hooks/use-character-context-store";
import { useSpeak } from "@/app/(auth)/convos/_play/use-speak";
import { getStatusIcon } from "@/app/(auth)/insights/insights-v2/precision-insight-view/status-icons";
import { useGetComponentId } from "@/app/nmm/[component-id]/use-get-component-id";
import { BookmarkButton } from "@/app/nmm/bookmark-button";
import { useIsSuperAdmin } from "@/domain/auth/auth.queries";
import { useListComponentVariantsQuery } from "@/domain/component/list-component-variants";

import { useGetCharacter } from "@/hooks/use-get-character";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { useBrightModeStore } from "../settings-dialog/use-bright-mode-store";

import { useListDiscoveryQuery } from "@/domain/sentence/use-list-discovery-query";
import { useUpdateDiscoveryMutation } from "@/domain/sentence/use-update-discovery-mutation";
import { useListRelatedHSKWords } from "@/hooks/use-list-related-hsk-words";
import { useYoutubeVideoUrl } from "../summary/with-youtube-video";
import { Icons } from "../ui/icons.v2";
import { smartSplit } from "../youtube-page/utils/smart-split";
import { CharacterItem } from "./character-item";
import { characterStore } from "./character-store";
import { PlayButtonV2 } from "./play-button-v2";
import { CharacterTrackButton } from "./selected-character/character-track-button";
import { useCharacterEditStore } from "./use-character-edit-store";
import { isNonRomanLang } from "./utils/is-non-roman-lang";
import { WithInteractiveTitle } from "./with-interative-title";
import { useCurrentTime } from "../youtube-page/use-current-time-store";
import { useAudioProviderState } from "../settings-dialog/hooks/use-audio-provider-state";
import { useYoutubeRefState } from "./use-youtube-ref-state";
import { cn } from "@/lib/utils";
import { useIsPlayingState } from "../youtube-page/use-is-playing-state";

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

  const { data: meaningDiscovery, isLoading: isMeaningDiscoveryLoading } =
    useListDiscoveryQuery({
      content: componentId,
      lang,
    });

  const updateMeaningMutation = useUpdateDiscoveryMutation();

  const { videoUrl, setVideoUrl, addVideoUrl, setAddVideoUrl } =
    useYoutubeVideoUrl();

  const selectedCompInput = characterId;

  const StatusIcon = getStatusIcon(character?.status);
  const showPinyin = useBrightModeStore((state) => state.showPinyin);

  const finalEnVal =
    englishMeanings?.length === 1
      ? meaningDiscovery?.en || englishMeanings?.[0] || selectedComp?.en
      : meaningDiscovery?.en || selectedComp?.en || englishMeanings?.[0];

  const selectedPinyin = pinyins?.length
    ? pinyins?.join("/")
    : pinyins?.[0] ||
      pinyinInput ||
      selectedComp?.pinyin ||
      meaningDiscovery?.pinyin;

  const customRef: any = useRef(null) as any;

  const { data: relatedHskWords } = useListRelatedHSKWords(characterId);

  const { provider, setProvider } = useAudioProviderState();
  const id = `${selectedCompInput}#${lang}#${provider}`;
  const { currentTime, setCurrentTime, duration } = useCurrentTime(id);

  const { seekAndPlay, youtubeRef } = useYoutubeRefState();

  const { isPlaying, setIsPlaying } = useIsPlayingState(id);

  const isHsk = relatedHskWords?.find((word) => word?.hanzi === characterId);

  return (
    <div className="flex flex-col items-start space-y-2 w-full">
      {edit && meaningDiscovery?.id && isSuperAdmin ? (
        <input
          value={newPinyin || meaningDiscovery?.pinyin}
          onChange={(event: any) => {
            setNewPinyin(event?.target.value);
          }}
          className="text-gray-900 dark:text-gray-400  font-light focus-visible:ring-0 focus-visible:ring-transparent w-full"
        />
      ) : showPinyin && isNonRomanLang(lang || meaningDiscovery?.lang) ? (
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
              meaningDiscovery?.pinyin ||
              meaningDiscovery?.roman}
          </h2>
        )
      ) : null}

      <div className="flex justify-between items-center w-full">
        <WithInteractiveTitle
          customRef={customRef}
          text={selectedCompInput}
          lang={lang}
          className={
            selectedCompInput?.length < 8 ? "lg:text-4xl text-4xl" : "text-2xl"
          }
        >
          <div>
            {smartSplit({ input: selectedCompInput, lang })?.map(
              (item: string, idx: number) => {
                const startTime =
                  (duration / (selectedCompInput?.length - 1)) * idx;

                const endTime =
                  (duration / (selectedCompInput?.length - 1)) * (idx + 1);

                if (isPlaying) {
                  return (
                    <span
                      className={
                        selectedCompInput?.length < 4 ? "text-5xl" : "text-2xl"
                      }
                      key={`character-title-${item}-${idx}-${idx}`}
                    >
                      <CharacterItem
                        className={cn(
                          selectedCompInput?.length < 8
                            ? "lg:text-4xl text-4xl"
                            : "text-2xl",

                          currentTime >= startTime && currentTime <= endTime
                            ? "dark:text-white text-black"
                            : "text-gray-500"
                        )}
                        onClick={() => {
                          if (duration) {
                            seekAndPlay(startTime, customRef);
                          }

                          // setWords({
                          //   word: character,
                          //   transcriptionId: item?.id,
                          //   contentId,
                          // });
                        }}
                        // disableForgotten
                        character={item}
                      />
                    </span>
                  );
                }

                return (
                  <Link
                    className={
                      selectedCompInput?.length < 4 ? "text-5xl" : "text-2xl"
                    }
                    key={`character-title-${item}-${idx}-${idx}`}
                    href={`/nmm/${item}?lang=${lang || "zh"}${context ? `&context=${context}` : ""}`}
                  >
                    <CharacterItem
                      className={
                        selectedCompInput?.length < 8
                          ? "lg:text-4xl text-4xl"
                          : "text-2xl"
                      }
                      onClick={() => {
                        if (duration) {
                          seekAndPlay(startTime, customRef);
                        }

                        // setWords({
                        //   word: character,
                        //   transcriptionId: item?.id,
                        //   contentId,
                        // });
                      }}
                      // disableForgotten
                      character={item}
                    />
                  </Link>
                );
              }
            )}
          </div>
        </WithInteractiveTitle>

        <div className="text-2xl">
          {isHsk && typeof isHsk?.hskLevel === "number" ? (
            <p>HSK {isHsk?.hskLevel} </p>
          ) : (
            selectedCompInput?.length < 4 && <StatusIcon.Icon />
          )}
        </div>
      </div>

      {lang === "en" ? null : edit && meaningDiscovery?.id && isSuperAdmin ? (
        <input
          value={newEn || meaningDiscovery?.en}
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
        {!edit && (
          <PlayButtonV2
            customRef={customRef}
            text={selectedCompInput}
            lang={lang}
            className="text-2xl"
          />
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

        {!edit && isSuperAdmin && (
          <button
            onClick={() => {
              setAddVideoUrl((prev: boolean) => !prev);
            }}
          >
            <Icons.youtube className="text-xl" />
          </button>
        )}

        {edit && meaningDiscovery?.id && isSuperAdmin ? (
          <div className="space-x-4">
            <button
              disabled={updateMeaningMutation.isPending}
              onClick={() => {
                updateMeaningMutation
                  // @ts-ignore
                  .mutateAsync({
                    id: meaningDiscovery?.id,
                    pinyin: newPinyin || meaningDiscovery?.pinyin,
                    en: newEn || meaningDiscovery?.en,
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
          meaningDiscovery?.id &&
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
      </div>
    </div>
  );
};
