import { useListComponents } from "@/domain/lesson/component.queries";
import { SelectedCharacterProps } from "./_select-character/select-character.types";

import { cn } from "@/lib/utils";
import { Icons } from "./ui/icons.v2";

import { useUpdateCharacterStatusMutation } from "@/domain/lesson/character.mutations";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { getReviewDate } from "@/hooks/get-review-date";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useBrightModeStore } from "./settings-dialog/use-bright-mode-store";
import { getReviewSearchParams } from "./settings-dialog/use-get-review-url";
import { useIsSuperAdmin } from "@/domain/auth/auth.queries";
import { TheDock } from "./the-dock";
import { useShowAutomaticallyTheDock } from "@/hooks/use-show-automatically-the-dock";
import { SelectedCharacterStoryButton } from "./_select-character/selected-character-story-button";
import { SelectedCharacterContentsButton } from "./_select-character/selected-character-contents-button";

const isMultiSentence = (str: string) => {
  const isHanziMultiSentence = str.split("。")?.length > 1;

  if (!isHanziMultiSentence) {
    return str.split(".")?.length > 1;
  }

  return isHanziMultiSentence;
};
export const FloatingCharacterNavbar = (props: SelectedCharacterProps) => {
  const {
    selectedComp,
    setReadMode,
    readMode,
    isAlreadyLearned,
    addCharacterMutation,
    selectedComp2,
    setView,
    view,
    lang,
    characterId,
    selectedChar,
    firstLesson,
    discoverMutation,
    deleteComponentMutation,
  } = props;

  const { data: components, isLoading } = useListComponents();
  const { data: chars } = useListCharactersQuery();
  const hasAlreadyLearned = components?.find(
    (item: any) => (item?.hanzi || item?.input) === characterId
  );

  const character = chars?.find(
    (item: any) => (item?.hanzi || item?.input) === characterId
  ) as any;
  const router = useRouter();

  const brightMode = useBrightModeStore((state: any) => state.mode);
  const setBrightMode = useBrightModeStore((state: any) => state.setMode);

  const pinyinOrRoman =
    (hasAlreadyLearned && hasAlreadyLearned?.pinyin) ||
    hasAlreadyLearned?.roman;

  const multiSentence = isMultiSentence(characterId);

  const routeName = usePathname();

  const currentCharacter = selectedComp;

  const updateCharacterStatusMutation = useUpdateCharacterStatusMutation();
  const isSuperAdmin = useIsSuperAdmin();

  const { data } = useListCharactersQuery();

  const learnedChar = data?.filter(
    (item: any) => (item?.input || item?.hanzi) === characterId
  )?.[0];

  const isAutomatic = useShowAutomaticallyTheDock();

  return (
    <TheDock isAutomatic={isAutomatic} className="bottom-4">
      <div className="flex items-center w-full justify-center">
        <div className="px-8  py-2 bg-black no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
          <div className="space-x-8 flex justify-center items-center w-full">
            <button
              className={cn(
                "text-xl",
                brightMode ? "dark:text-white" : "dark:text-gray-500"
              )}
              onClick={() => {
                setBrightMode((prev: any) => !prev);
                setReadMode(!readMode);
              }}
            >
              <Icons.glassesRound />
            </button>

            <button
              className="text-xl"
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
            {multiSentence && (
              <button
                className="text-xl"
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
            )}
            {isLoading || isAlreadyLearned ? null : (
              <button
                className="text-xl"
                onClick={() => {
                  addCharacterMutation?.mutateAsync({
                    lang: lang,
                    status: "DISCOVERED",
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

            {!isLoading && isSuperAdmin && !selectedComp2 && (
              <button
                className="text-xl"
                disabled={
                  discoverMutation.isLoading || discoverMutation.isSuccess
                }
                onClick={() => {
                  discoverMutation
                    .mutateAsync({
                      hanzi: selectedComp?.hanzi || characterId,
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
                ) : (
                  <Icons.language />
                )}
              </button>
            )}
            {currentCharacter?.status === "forgotten" && (
              <button
                className="text-xl"
                disabled={deleteComponentMutation.isLoading}
                onClick={() => {
                  updateCharacterStatusMutation.mutateAsync({
                    characterId: currentCharacter?.id,
                    status: "DISCOVERED",
                    forgottenAt: Date.now(),
                    rightAt: Date.now(),
                    statusHistory: (
                      currentCharacter?.statusHistory || []
                    ).concat({
                      type: "status-change",
                      createdAt: Date.now(),
                      newStatus: "DISCOVERED",
                      oldStatus: currentCharacter?.status,
                    }),
                    rightCount: (currentCharacter?.rightCount || 0) + 1,
                  } as any);

                  // deleteComponentMutation
                  //   .mutateAsync({
                  //     hanzi: hasAlreadyReviewed?.hanzi,
                  //     id: hasAlreadyReviewed?.id,
                  //   } as any)
                  //   .then((resp: any) => {
                  //     toast(`Component: ${selectedComp?.hanzi || characterId} Successfully deleted
                  //     \n
                  //     ${JSON.stringify(resp)}`);
                  //   });
                }}
              >
                {updateCharacterStatusMutation.isLoading ? (
                  <Icons.spinner spinPulse />
                ) : (
                  <Icons.powerOff />
                )}
              </button>
            )}

            {learnedChar && characterId?.length === 1 && (
              <SelectedCharacterStoryButton {...props} />
            )}

            {learnedChar && <SelectedCharacterContentsButton {...props} />}
          </div>

          <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
        </div>
      </div>
    </TheDock>
  );
};
