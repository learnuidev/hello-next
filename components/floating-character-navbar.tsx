import { useListComponents } from "@/domain/lesson/component.queries";
import { SelectedCharacterProps } from "./_select-character/select-character.types";

import { cn } from "@/lib/utils";
import { Icons } from "./ui/icons.v2";

import { useCharacterContextStore } from "@/app/(auth)/convos/[content-id]/hooks/use-character-context-store";
import { useUpdateCharacterStatusMutation } from "@/domain/lesson/character.mutations";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { getReviewDate } from "@/hooks/get-review-date";
import { useShowAutomaticallyTheDock } from "@/hooks/use-show-automatically-the-dock";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { SelectedCharacterContentsButton } from "./_select-character/selected-character-contents-button";
import { SelectedCharacterStoryButton } from "./_select-character/selected-character-story-button";
import { useBrightModeStore } from "./settings-dialog/use-bright-mode-store";
import { getReviewSearchParams } from "./settings-dialog/use-get-review-url";
import { TheDock } from "./the-dock";
import { useSelectedCharacterData } from "./use-selected-character";
import { useDiscoverMutation } from "@/domain/nmm/discover.mutations";

const isMultiSentence = (str: string) => {
  const isHanziMultiSentence = str.split("。")?.length > 1;

  if (!isHanziMultiSentence) {
    return str.split(".")?.length > 1;
  }

  return isHanziMultiSentence;
};
export const FloatingCharacterNavbar = ({
  characterId,
}: {
  characterId: string;
}) => {
  const { data: characterData } = useSelectedCharacterData({ characterId });

  const {
    selectedComp,
    setReadMode,
    readMode,
    isAlreadyLearned,
    addCharacterMutation,
    setView,
    view,
    selectedComp2,
    lang,
    selectedChar,
    firstLesson,
    deleteComponentMutation,
  } = characterData;

  const searchParams = useSearchParams();
  const discoverMutation = useDiscoverMutation();

  const context = searchParams?.get("context");

  const { data: components, isLoading } = useListComponents();
  const { data: chars } = useListCharactersQuery();

  const hasAlreadyDiscovered = components?.find(
    (item: any) => (item?.hanzi || item?.input) === characterId
  );

  const character = chars?.find(
    (item: any) => (item?.hanzi || item?.input) === characterId
  ) as any;
  const router = useRouter();

  const brightMode = useBrightModeStore((state: any) => state.mode);
  const setBrightMode = useBrightModeStore((state: any) => state.setMode);
  const showPinyin = useBrightModeStore((state: any) => state.showPinyin);
  const setShowPinyin = useBrightModeStore((state: any) => state.setShowPinyin);

  const multiSentence = isMultiSentence(characterId);

  const currentCharacter = selectedComp;

  const updateCharacterStatusMutation = useUpdateCharacterStatusMutation();

  const { data } = useListCharactersQuery();

  const learnedChar = data?.filter(
    (item: any) => (item?.input || item?.hanzi) === characterId
  )?.[0];

  const isAutomatic = useShowAutomaticallyTheDock();

  const characterContext = useCharacterContextStore((state) => state.context);
  const contentContext = characterContext?.filter((item) =>
    JSON.stringify(item)?.includes(firstLesson?.hanzi || selectedChar)
  );

  return (
    <TheDock isAutomatic={isAutomatic} className="bottom-4">
      <div className="flex items-center w-full justify-center">
        <div className="px-8  py-2 bg-gray-100 dark:bg-black no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
          <div className="space-x-8 flex justify-center items-center w-full">
            <button
              className={cn(
                "text-xl",
                !brightMode
                  ? "dark:text-white text-black"
                  : "dark:text-gray-500 text-gray-300"
              )}
              onClick={() => {
                setBrightMode((prev: any) => !prev);
                setReadMode(!readMode);
              }}
            >
              <Icons.glassesRound />
            </button>
            <button
              className={cn(
                "text-xl",
                showPinyin
                  ? "dark:text-white text-black"
                  : "dark:text-gray-500 text-gray-300"
              )}
              onClick={() => {
                setShowPinyin((prev: any) => !prev);
              }}
            >
              P
            </button>

            <button
              className="text-xl text-black dark:text-white"
              onClick={() => {
                if (characterId?.length > 1) {
                  router.push(`/review?input=${characterId}`);
                } else {
                  const { reviewDate, month, year } = getReviewDate(character);

                  return router.push(
                    `/review?${getReviewSearchParams({ date: reviewDate })}`
                  );

                  setView("play");
                }
              }}
            >
              <Icons.play className="text-2xl" />
            </button>
            {/* {multiSentence && (
              <button
                className="text-xl text-black dark:text-white"
                onClick={() => {
                  if (view === "zoom") {
                    setView("unzoom");
                  } else {
                    setView("zoom");
                  }
                }}
              >
                {view === "zoom" ? (
                  <Icons.zoomOut className="text-2xl" />
                ) : (
                  <Icons.zoomIn className="text-2xl" />
                )}
              </button>
            )} */}
            {isAlreadyLearned ? null : (
              <button
                className="text-xl text-black dark:text-white"
                onClick={() => {
                  addCharacterMutation?.mutateAsync({
                    lang: lang,
                    status: "DISCOVERED",
                    context,
                    contentContext:
                      contentContext?.length > 0 ? contentContext : null,
                    story: "todo",
                    hanzi: firstLesson?.hanzi || selectedChar,
                    journeyId: firstLesson?.id || "default",
                  });
                }}
              >
                {addCharacterMutation.isLoading ? (
                  <Icons.spinner spinPulse />
                ) : (
                  <Icons.lightBulb className="text-2xl" />
                )}
              </button>
            )}
            {!isAlreadyLearned ||
            currentCharacter?.status === "forgotten" ? null : (
              <button
                disabled={updateCharacterStatusMutation?.isLoading}
                className="text-xl text-black dark:text-white"
                onClick={() => {
                  updateCharacterStatusMutation.mutateAsync({
                    characterId: currentCharacter?.id,
                    status: "forgotten",
                    statusHistory: (
                      currentCharacter?.statusHistory || []
                    ).concat({
                      type: "status-change",
                      createdAt: Date.now(),
                      newStatus: "forgotten",
                      oldStatus: currentCharacter?.status,
                    }),
                    forgottenAt: Date.now(),
                    rightAt: Date.now(),
                    rightCount: (currentCharacter?.rightCount || 0) + 1,
                  } as any);
                }}
              >
                {updateCharacterStatusMutation.isLoading ? (
                  <Icons.spinner className="text-2xl" spinPulse />
                ) : (
                  <Icons.fire className="text-2xl" />
                )}
              </button>
            )}

            {characterId?.length > 1 ||
            isLoading ? null : hasAlreadyDiscovered?.group ? null : (
              <button
                className="text-xl text-gray-400 hover:text-black"
                disabled={
                  discoverMutation.isLoading || discoverMutation.isSuccess
                }
                onClick={() => {
                  discoverMutation
                    .mutateAsync({
                      hanzi: selectedComp?.hanzi || characterId,
                      // story: "todo",
                    })
                    .then((resp: any) => {
                      toast(
                        `Component Successfully discovered ${JSON.stringify(resp)}`
                      );
                    });
                }}
              >
                {discoverMutation.isLoading ? (
                  <Icons.spinner spinPulse />
                ) : discoverMutation.isSuccess ? (
                  <Icons.checkCircle className="transition" />
                ) : (
                  <Icons.language />
                )}

                {/* <span>{(selectedComp?.hanzi || characterId)?.length}</span> */}
              </button>
            )}

            {isAlreadyLearned && (
              <button
                className="text-xl text-black dark:text-white"
                disabled={deleteComponentMutation.isLoading}
                onDoubleClick={() => {
                  deleteComponentMutation
                    .mutateAsync({
                      hanzi: currentCharacter?.hanzi,
                      id: currentCharacter?.id,
                    } as any)
                    .then((resp: any) => {
                      toast(`Component: ${selectedComp?.hanzi || characterId} Successfully deleted
                      \n
                      ${JSON.stringify(resp)}`);
                    });
                }}
              >
                {deleteComponentMutation.isLoading ? (
                  <Icons.spinner spinPulse />
                ) : (
                  <Icons.powerOff />
                )}
              </button>
            )}

            {learnedChar && characterId?.length === 1 && (
              <SelectedCharacterStoryButton characterId={characterId} />
            )}

            <SelectedCharacterContentsButton characterId={characterId} />

            {/* {characterId?.length === 1 && (
              <button
                className={cn(
                  "text-xl transition",
                  view === "pinyin" ? "text-white" : "text-gray-400"
                )}
                onClick={() => {
                  setView("pinyin");
                }}
              >
                <Icons.pinyinChart />
              </button>
            )} */}
          </div>

          <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
        </div>
      </div>
    </TheDock>
  );
};
